import { createSlice } from '@reduxjs/toolkit';

export interface RunnerLog {
  log: string
}

const initialState: { runnerLog: RunnerLog } = {
    runnerLog: {
        log: `
            > my-next-app@1.0.0 test
            > jest

            PASS  tests/homepage.test.js
            ✓ should render the homepage correctly (45 ms)

            FAIL  tests/api.test.js
            ✕ should return a 200 status code for /api/hello (12 ms)
            ✕ should return the expected JSON structure (8 ms)

            ● should return a 200 status code for /api/hello

            expect(received).toBe(expected) // Object.is equality

            Expected: 200
            Received: 500

              12 |     const response = await fetch('/api/hello');
              13 |     const status = response.status;
            > 14 |     expect(status).toBe(200);
                 |                   ^
              15 |   });
              16 |

              at Object.<anonymous> (tests/api.test.js:14:19)

            ● should return the expected JSON structure

             expect(received).toEqual(expected) // deep equality

            Expected: {"message": "Hello, world!"}
            Received: {"error": "Internal Server Error"}

              18 |     const response = await fetch('/api/hello');
              19 |     const json = await response.json();
            > 20 |     expect(json).toEqual({"message": "Hello, world!"});
                 |                  ^
              21 |   });
              22 |

              at Object.<anonymous> (tests/api.test.js:20:20)

            Test Suites: 1 failed, 1 passed, 2 total
            Tests:       2 failed, 1 passed, 3 total
            Snapshots:   0 total
            Time:        1.987 s
            Ran all test suites.
        `
    },
};

const runnerLog = createSlice({
  name: 'runnerLog',
  initialState,
  reducers: {
    setRunnerLog: (state, action) => {
      state.runnerLog = action.payload;
    },
  },
});

export const { setRunnerLog } = runnerLog.actions;
export default runnerLog.reducer;
