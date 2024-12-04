Feature: Retrieve estimated age from the Agify API

  # The API documentation does not mention what is considered a valid name, 
  # hence I have included a few that I assume are valid.
  Scenario: Retrieve estimated age for a single name
    When I send a GET request to the API with a valid <name> query parameter
    Then the API should respond with status code 200
    And the response should be in JSON format
    And the response should contain an estimated age, count and name

    Examples:
      | name           |
      | "Billybob"     |
      | "Billy-bob"    |
      | "Seán"         |
      | "Seán Connery" |

  Scenario: Retrieve estimated age for a single name with localization
    When I send a GET request to the API with a valid <country_id> country ID query parameter
    Then the API should respond with status code 200
    And the response should be in JSON format
    And the response should contain an estimated age, count and name

    Examples:
      | country_id |
      | "US"       |
      | "GB"       |
      | "IE"       |

  Scenario: Retrieve estimated age for multiple names sent in a single request
    When I send a GET request to the API with multiple valid name query parameters
    Then the API should respond with status code 200
    And the response should be in JSON format
    And the response should include a list of items, each with an estimated age

  Scenario: Attempt to retrieve estimated age with an invalid API key
    When I send a GET request to the API with an invalid API key
    Then the API should respond with status code 401
    And the response contains the "Invalid API key" error

  Scenario: Attempt to retrieve estimated age without providing the name parameter
    When I send a GET request to the API without providing the name parameter
    Then the API should respond with status code 422
    And the response contains the "Missing 'name' parameter" error
    
  # The API documentation doesn't mention what would be considered an invalid name; 
  # a space, special characters and numbers are all valid and no error is returned.
  # Therefore, the steps for this scenario are not fully implemented.
  Scenario: Attempt to retrieve estimated age for an invalid name
    When I send a GET request to the API with an invalid name parameter
    Then the API should respond with status code 422
    And the response contains the "Invalid 'name' parameter" error
