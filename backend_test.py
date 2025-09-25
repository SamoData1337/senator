#!/usr/bin/env python3
"""
Backend API Testing Suite
Tests the FastAPI backend server functionality including endpoints and MongoDB integration.
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Backend URL from environment
BACKEND_URL = "https://industrial-portfolio.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'details': details,
            'timestamp': datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details:
            print(f"   Details: {details}")
    
    def test_server_health(self):
        """Test if the FastAPI server is running and responding"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Server Health Check", True, "Server is running and responding correctly", f"Response: {data}")
                else:
                    self.log_test("Server Health Check", False, "Server responding but unexpected message", f"Got: {data}")
            else:
                self.log_test("Server Health Check", False, f"Server returned status code {response.status_code}", response.text)
        except requests.exceptions.RequestException as e:
            self.log_test("Server Health Check", False, "Failed to connect to server", str(e))
    
    def test_status_post_endpoint(self):
        """Test POST /api/status endpoint"""
        try:
            test_data = {
                "client_name": f"test_client_{uuid.uuid4().hex[:8]}"
            }
            
            response = requests.post(
                f"{self.base_url}/status",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                # Verify response structure
                required_fields = ['id', 'client_name', 'timestamp']
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields and data['client_name'] == test_data['client_name']:
                    self.log_test("POST /status", True, "Status creation successful", f"Created status with ID: {data.get('id')}")
                    return data  # Return for use in other tests
                else:
                    self.log_test("POST /status", False, "Response missing required fields or incorrect data", f"Missing: {missing_fields}, Data: {data}")
            else:
                self.log_test("POST /status", False, f"POST request failed with status {response.status_code}", response.text)
        except requests.exceptions.RequestException as e:
            self.log_test("POST /status", False, "Failed to make POST request", str(e))
        return None
    
    def test_status_get_endpoint(self):
        """Test GET /api/status endpoint"""
        try:
            response = requests.get(f"{self.base_url}/status", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET /status", True, f"Retrieved {len(data)} status checks", f"Response is valid list")
                    return data
                else:
                    self.log_test("GET /status", False, "Response is not a list", f"Got: {type(data)}")
            else:
                self.log_test("GET /status", False, f"GET request failed with status {response.status_code}", response.text)
        except requests.exceptions.RequestException as e:
            self.log_test("GET /status", False, "Failed to make GET request", str(e))
        return None
    
    def test_mongodb_integration(self):
        """Test MongoDB integration by creating and retrieving data"""
        print("\n🔍 Testing MongoDB Integration...")
        
        # First, create a status check
        created_status = self.test_status_post_endpoint()
        if not created_status:
            self.log_test("MongoDB Integration", False, "Could not create status check for MongoDB test", None)
            return
        
        # Then retrieve all status checks
        all_statuses = self.test_status_get_endpoint()
        if all_statuses is None:
            self.log_test("MongoDB Integration", False, "Could not retrieve status checks for MongoDB test", None)
            return
        
        # Check if our created status is in the list
        created_id = created_status.get('id')
        found_status = next((status for status in all_statuses if status.get('id') == created_id), None)
        
        if found_status:
            self.log_test("MongoDB Integration", True, "Data persistence verified - created status found in database", f"Status ID: {created_id}")
        else:
            self.log_test("MongoDB Integration", False, "Data persistence failed - created status not found in database", f"Looking for ID: {created_id}")
    
    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            # Test with Origin header to trigger CORS response
            headers = {
                'Origin': 'https://example.com',
                'Access-Control-Request-Method': 'GET'
            }
            response = requests.get(f"{self.base_url}/", headers=headers, timeout=10)
            
            cors_origin = response.headers.get('Access-Control-Allow-Origin')
            cors_credentials = response.headers.get('Access-Control-Allow-Credentials')
            
            if cors_origin:
                cors_info = f"Allow-Origin: {cors_origin}"
                if cors_credentials:
                    cors_info += f", Allow-Credentials: {cors_credentials}"
                self.log_test("CORS Configuration", True, "CORS properly configured", cors_info)
            else:
                self.log_test("CORS Configuration", False, "No CORS headers found", "This might cause frontend issues")
        except requests.exceptions.RequestException as e:
            self.log_test("CORS Configuration", False, "Failed to test CORS", str(e))
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend API Tests")
        print(f"🎯 Testing Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test basic server health
        self.test_server_health()
        
        # Test individual endpoints
        print("\n🔍 Testing API Endpoints...")
        self.test_status_post_endpoint()
        self.test_status_get_endpoint()
        
        # Test database integration
        self.test_mongodb_integration()
        
        # Test CORS configuration
        print("\n🔍 Testing CORS Configuration...")
        self.test_cors_headers()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        if passed == total:
            print("\n🎉 All tests passed! Backend is working correctly.")
            return True
        else:
            print(f"\n⚠️  {total - passed} test(s) failed. Check the details above.")
            return False

def main():
    """Main test execution"""
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()