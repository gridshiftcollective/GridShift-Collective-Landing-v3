# Playwright MCP Integration with Full AI Compatibility

## Overview
This comprehensive rule governs the integration and usage of Playwright MCP (Model Context Protocol) server within Cursor AI for automated web testing, browser interactions, and AI-driven test generation in the GridShift project. This enables AI agents to perform complex web automation tasks through natural language instructions.

## Core Principles
- **Full AI Compatibility**: AI agents can generate, execute, and debug Playwright tests from natural language descriptions
- **Reliability First**: Playwright's auto-waiting capabilities ensure stable test execution across all scenarios
- **Cross-Browser Testing**: Single API for Chrome, Firefox, Safari, and Edge testing with unified behavior
- **AI-Augmented Testing**: Leverages Cursor AI with MCP for intelligent test generation and execution
- **Consistent Viewports**: Standardized mobile, tablet, and desktop viewports for reliable cross-device testing
- **Semantic Locators**: Prioritizes accessibility-based locators for robust, maintainable tests

## Playwright MCP Server Configuration
The MCP server must be configured in `.cursor/mcp.json` with the following structure:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

## AI Agent Integration

### Natural Language Patterns
AI agents should understand and respond to these natural language patterns:

**Navigation Testing:**
- "Test that the GridShift homepage loads correctly on mobile"
- "Verify navigation to the about page works on all devices"
- "Check that the contact form is accessible from the main menu"

**Form Testing:**
- "Test user registration form validation on desktop"
- "Verify login functionality works with valid/invalid credentials"
- "Check that form submission shows success message"

**Content Verification:**
- "Ensure the hero section displays correct text on tablet"
- "Verify all images load properly on mobile viewport"
- "Check that pricing information is visible and accurate"

**User Interactions:**
- "Test that clicking the CTA button scrolls to contact section"
- "Verify dropdown menus work correctly on mobile"
- "Check hover effects on navigation items"

### AI Instruction Templates

**Basic Navigation Test:**
```
Generate a Playwright test that:
- Navigates to [URL]
- Verifies the page title contains [expected text]
- Checks that [specific element] is visible
- Runs on [mobile/tablet/desktop] viewport
```

**Form Interaction Test:**
```
Create a test that:
- Fills out the [form name] with [sample data]
- Submits the form
- Verifies [success/error message] appears
- Tests on [specific viewport]
```

**Responsive Design Test:**
```
Generate tests to verify:
- Layout adapts correctly on mobile (390x844)
- Content is readable on tablet (834x1194)
- Full functionality on desktop (1920x1080)
- No horizontal scrolling on any viewport
```

## Test Generation Workflow
When generating tests with Cursor AI + Playwright MCP, follow this systematic approach:

1. **Scenario Analysis**: Parse the natural language request to identify:
   - Target URL and entry point
   - User actions to perform (click, fill, navigate, etc.)
   - Expected outcomes and assertions
   - Required viewport(s) for testing

2. **Test Structure Planning**: Determine:
   - Test file name and location (`tests/*.spec.ts`)
   - Test suite organization (`describe` blocks)
   - Individual test cases (`it` blocks)
   - Required fixtures and setup

3. **Code Generation**: Create TypeScript test code with:
   - Proper imports (`@playwright/test`)
   - Page object setup and configuration
   - Semantic locators using `getByRole`, `getByLabel`, etc.
   - Action chains and user interactions
   - Comprehensive assertions
   - Error handling and cleanup

4. **Viewport Configuration**: Apply appropriate viewport settings:
   - Mobile: `viewport: { width: 390, height: 844 }`
   - Tablet: `viewport: { width: 834, height: 1194 }`
   - Desktop: `viewport: { width: 1920, height: 1080 }`

5. **Execution and Validation**: Run tests and verify:
   - Test passes on specified viewport(s)
   - Assertions correctly validate expected behavior
   - No flaky behavior or timing issues
   - Performance meets requirements (<30 seconds)

## Viewport Standards
Use these standardized viewports for consistent testing across all AI-generated tests:

- **Mobile**: 390x844 (iPhone 12) - Primary mobile testing viewport
- **Tablet**: 834x1194 (iPad Pro 11) - Tablet and small desktop testing
- **Desktop**: 1920x1080 (Full HD) - Standard desktop testing viewport

## Best Practices for AI-Generated Tests

### Locator Strategy (Priority Order)
1. **Semantic Locators** (Preferred):
   - `page.getByRole('button', { name: 'Submit' })`
   - `page.getByLabel('Email Address')`
   - `page.getByPlaceholder('Enter your name')`

2. **Content-Based Locators**:
   - `page.getByText('Welcome to GridShift')`
   - `page.getByAltText('Company Logo')`

3. **Structural Locators** (Last Resort):
   - `page.locator('#submit-button')`
   - `page.locator('.form-input')`

### Assertion Best Practices
- Use web-first assertions: `toBeVisible()`, `toHaveText()`, `toHaveAttribute()`
- Prefer semantic assertions over visual checks when possible
- Avoid `toHaveScreenshot()` unless specifically testing visual design
- Use `toBeEnabled()` and `toBeDisabled()` for interactive elements

### Test Structure Guidelines
```typescript
import { test, expect } from '@playwright/test';

test.describe('GridShift Homepage', () => {
  test('loads correctly on mobile viewport', async ({ page }) => {
    // Setup viewport
    await page.setViewportSize({ width: 390, height: 844 });

    // Navigate and verify
    await page.goto('/');
    await expect(page).toHaveTitle(/GridShift/);
    await expect(page.getByRole('heading')).toBeVisible();
  });
});
```

## Common Test Patterns & AI Generation Examples

### Navigation Testing
**AI Prompt:** "Test that the homepage navigation works correctly on all viewports"
```typescript
// AI-Generated Test Example
test.describe('Homepage Navigation', () => {
  ['mobile', 'tablet', 'desktop'].forEach(viewport => {
    test(`works on ${viewport}`, async ({ page }) => {
      const sizes = { mobile: {width: 390, height: 844}, tablet: {width: 834, height: 1194}, desktop: {width: 1920, height: 1080} };
      await page.setViewportSize(sizes[viewport]);

      await page.goto('/');
      await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
      await expect(page).toHaveURL(/about/);
    });
  });
});
```

### Form Testing
**AI Prompt:** "Create a test for the contact form submission with validation"
```typescript
test('contact form submission and validation', async ({ page }) => {
  await page.goto('/contact');

  // Fill form with valid data
  await page.getByLabel('Name').fill('Test User');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Message').fill('Test message');

  // Submit and verify
  await page.getByRole('button', { name: 'Send Message' }).click();
  await expect(page.getByText('Message sent successfully')).toBeVisible();
});
```

### Responsive Design Testing
**AI Prompt:** "Verify the hero section layout adapts correctly across all viewports"
```typescript
test.describe('Hero Section Responsive Design', () => {
  const viewports = [
    { name: 'mobile', size: { width: 390, height: 844 } },
    { name: 'tablet', size: { width: 834, height: 1194 } },
    { name: 'desktop', size: { width: 1920, height: 1080 } }
  ];

  viewports.forEach(({ name, size }) => {
    test(`adapts correctly on ${name}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto('/');

      const heroSection = page.locator('.hero-section');
      await expect(heroSection).toBeVisible();

      // Verify no horizontal scrolling
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });
  });
});
```

## Integration with GridShift Development

### File Organization
- Tests in `/tests` directory with `.spec.ts` extension
- Page objects in `/tests/pages/` for complex interactions
- Test data in `/tests/fixtures/` for reusable test data
- Custom utilities in `/tests/utils/` for common functions

### Development Workflow
1. **Local Development**: `npm run dev` for Vite server
2. **Test Execution**: `npx playwright test` for all tests
3. **Specific Test**: `npx playwright test tests/navigation.spec.ts`
4. **UI Mode**: `npx playwright test --ui` for interactive debugging
5. **Report Generation**: `npx playwright show-report` after test runs

### CI/CD Integration
- Tests run automatically on push/PR to main branch
- Parallel execution across viewports and browsers
- HTML reports generated and archived
- Test failures block deployment when critical

## Troubleshooting Guide

### Common Issues and Solutions

**Timing Issues:**
- **Problem**: Tests fail intermittently due to slow loading
- **Solution**: Use `await page.waitForLoadState('networkidle')` or increase timeouts
- **Prevention**: Leverage Playwright's auto-waiting instead of explicit waits

**Flaky Locators:**
- **Problem**: CSS selectors break when DOM changes
- **Solution**: Switch to semantic locators (`getByRole`, `getByLabel`)
- **Prevention**: Use data-testid attributes for critical elements

**Viewport-Specific Failures:**
- **Problem**: Tests pass on desktop but fail on mobile
- **Solution**: Always test across all viewports during development
- **Prevention**: Include viewport testing in AI generation templates

**Browser-Specific Issues:**
- **Problem**: Different behavior across Chrome, Firefox, WebKit
- **Solution**: Test on all browsers or isolate to specific browser context
- **Prevention**: Use cross-browser compatible locators and actions

### Debugging Techniques
- Use `page.pause()` to debug step-by-step
- Check browser console: `page.on('console', msg => console.log(msg.text()))`
- Capture screenshots: `await page.screenshot({ path: 'debug.png' })`
- Use Playwright's trace viewer: `npx playwright show-trace trace.zip`

## Security Considerations
- **No Sensitive Data**: Never commit passwords, API keys, or PII in test files
- **Environment Variables**: Use `.env` files for configuration with sensitive data
- **Test Data Isolation**: Create dedicated test accounts and clean up after execution
- **Production Testing**: Only test on production with explicit authorization
- **Browser Context**: Use incognito contexts to prevent data leakage between tests

## Performance Guidelines
- **Test Speed**: Individual tests should complete in <30 seconds
- **Parallel Execution**: Use `test.describe.parallel` for independent test suites
- **Browser Reuse**: Leverage browser contexts for related tests
- **Resource Optimization**: Close pages/contexts after use
- **Monitoring**: Track test execution times and optimize slow tests

## Advanced AI Integration Patterns

### Complex User Journey Testing
**AI Prompt:** "Test the complete user registration and login flow"
```typescript
test('complete user registration and login journey', async ({ page }) => {
  // Registration
  await page.goto('/register');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('securepassword');
  await page.getByRole('button', { name: 'Register' }).click();

  // Verification
  await expect(page.getByText('Registration successful')).toBeVisible();

  // Login
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('securepassword');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify logged in state
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});
```

### API + UI Integration Testing
**AI Prompt:** "Test that API data is correctly displayed in the UI"
```typescript
test('API data integration in UI', async ({ page }) => {
  // Mock API response
  await page.route('**/api/projects', async route => {
    await route.fulfill({
      json: [
        { id: 1, name: 'Project Alpha', status: 'active' },
        { id: 2, name: 'Project Beta', status: 'completed' }
      ]
    });
  });

  await page.goto('/projects');
  await expect(page.getByText('Project Alpha')).toBeVisible();
  await expect(page.getByText('Project Beta')).toBeVisible();
});
```

This comprehensive rule ensures AI agents can generate reliable, maintainable, and efficient Playwright tests for the GridShift project while maintaining consistency with development best practices.
