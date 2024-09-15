## playwright-typescript-starter

Test automation project boilerplate including packages structure, reporting, logging, multi-env run configuration for WEB and API test automation.

Pure Playwright APIs wrapped a little to add more logs/tracability to test execution and to make their's usage less-verbose in tests.

Optionally Database and Email utills added as the example how the project can be extended.

### Project Structure

- `src/core`  - project-agnostic code, would be common for any produc/project to be automated
- `src/project`  - project-specific base code, including objects and utils for the particular project (pageobjects for web, services for api, utils, datagenerators, etc.)
- `src/test` - project test specs, grouped by directories, components, etc. also test config definition is there (base urls, etc.)


### Quick Start

Do 4 steps:
- `npm install` - install dependencies
- `npm run install-playwright` - install playwright browsers + dependencies
- `npm run health-check` - run `test/health-check.spec.ts` spec
- `npm run show-report-playwright` or `npm run show-report-allure` - show reports

Explore examples:

- WEB automation: `project/booking/`, `test/booking/`
- API automation: `project/httpbin/`, `test/httpbin/`

#### Multi-env configuration

In the examples `process.env.npm_config_ENV` variable used to figure out the proper test configs.

```
static instance: TestConfig = new TestConfig(process.env.npm_config_ENV == undefined ? 'dev' : process.env.npm_config_ENV);
```

So, to switch env just provide `--ENV` in command-line.

- `npm run test-httpbin --ENV=dev` 
- `npm run test-httpbin --ENV=stage` 

Unknown or missing env value will eb mapped to `dev`.


#### Generate/Show Reports

- `npm run show-report-playwright` - Default playwright report
- `npm run show-report-allure` - Allure report (which is optional)