/**
 * Mock/demo mode responses.
 * Used when the Claude API is unavailable or FORCE_MOCK_MODE=true,
 * so the app can always be demonstrated end-to-end.
 */

function mockPlan(requirement, language) {
  return `## Problem Understanding
The user wants: "${requirement}" implemented in ${language}.

## Development Steps
1. Parse and validate the input.
2. Implement the core logic required by the problem.
3. Handle edge cases (empty input, invalid input, boundary values).
4. Return/print the result in a clear format.

## Algorithm / Approach
A straightforward single-pass or standard-library based approach is used,
favoring readability and correctness over micro-optimization.

## Required Components
- Main entry point / function
- Core logic function
- Input validation
- (Optional) helper utility functions

[DEMO MODE: This is a mock plan generated because the Claude API was unavailable.]`;
}

function mockCode(requirement, language) {
  const samples = {
    Java: `public class Solution {
    public static void main(String[] args) {
        int[] arr = {12, 35, 1, 10, 34, 1};
        System.out.println("Result: " + solve(arr));
    }

    public static int solve(int[] arr) {
        // Demo implementation for: ${requirement}
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int num : arr) {
            if (num > first) {
                second = first;
                first = num;
            } else if (num > second && num != first) {
                second = num;
            }
        }
        return second;
    }
}`,
    JavaScript: `function solve(input) {
  // Demo implementation for: ${requirement}
  return input;
}

console.log(solve("demo input"));

module.exports = { solve };`,
    Python: `def solve(input_value):
    """Demo implementation for: ${requirement}"""
    return input_value


if __name__ == "__main__":
    print(solve("demo input"))`,
    "C++": `#include <bits/stdc++.h>
using namespace std;

int solve(vector<int>& arr) {
    // Demo implementation for: ${requirement}
    return arr.empty() ? -1 : arr[0];
}

int main() {
    vector<int> arr = {12, 35, 1, 10, 34, 1};
    cout << "Result: " << solve(arr) << endl;
    return 0;
}`,
  };

  const code = samples[language] || samples.JavaScript;

  return {
    code,
    explanation: `[DEMO MODE] This is a mock code sample generated because the Claude API was unavailable. It illustrates the expected structure for a ${language} solution to: "${requirement}".`,
    files: [`Solution.${extensionFor(language)}`],
  };
}

function extensionFor(language) {
  const map = { Java: "java", JavaScript: "js", Python: "py", "C++": "cpp" };
  return map[language] || "txt";
}

function mockReview() {
  return `## Syntax Issues
No syntax issues detected in this demo sample.

## Logical Errors
None found in the demo path; validate against real inputs when live mode is enabled.

## Edge Cases
- Empty input
- Single-element input
- Duplicate values
- Very large input size

## Code Quality
Code is readable and reasonably organized. Consider adding input validation and comments.

## Suggested Improvements
- Add input validation and error handling.
- Add unit tests covering edge cases.
- Consider time/space complexity for large inputs.

[DEMO MODE: This is a mock review generated because the Claude API was unavailable.]`;
}

function mockTests(language) {
  return `## Test Cases

1. Input: [12, 35, 1, 10, 34, 1]
   Expected Output: 34
   Description: Standard case with distinct and duplicate values.

2. Input: [5, 5, 5, 5]
   Expected Output: -1 (or "no second largest")
   Description: Edge case — all elements identical.

3. Input: [1]
   Expected Output: -1 (or error/"not enough elements")
   Description: Edge case — array too small.

4. Input: []
   Expected Output: Error / handled gracefully
   Description: Edge case — empty array.

Language under test: ${language}

[DEMO MODE: This is a mock test suite generated because the Claude API was unavailable.]`;
}

module.exports = { mockPlan, mockCode, mockReview, mockTests };
