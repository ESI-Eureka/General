import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

class LoginAndSearchTest(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/login")

    def test_login_and_search(self):
        # Typing effect for email
        email_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "email"))
        )
        self.typing_effect(email_input, "la_rezzoug@esi.dz")

        # Typing effect for password
        password_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.ID, "password"))
        )
        self.typing_effect(password_input, "hello")

        # Click login button
        login_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
        )
        login_button.click()

        # Wait for the home page to load
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("http://localhost:3000/home")
        )

        # Search
        search_query = "model"  # Change this to your desired search query
        search_input = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "input"))
        )
        
        # Simulate typing effect
        for char in search_query:
            search_input.send_keys(char)
            time.sleep(0.1)  # Adjust the delay as needed

        # Press Enter key to trigger search
        search_input.send_keys(Keys.ENTER)

        time.sleep(3)

        # Wait for the results page to load
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/filtre")
        )

        

    def tearDown(self):
        self.driver.quit()

    def typing_effect(self, element, text):
        # Simulate typing effect for an input element
        for char in text:
            element.send_keys(char)
            time.sleep(0.1)  # Adjust the delay as needed


if __name__ == "__main__":
    unittest.main()
