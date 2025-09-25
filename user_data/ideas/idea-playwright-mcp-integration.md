# Divergence Report (SPARC Seeds): Playwright MCP Integration for GridShift

## 1. Objective Summary
Create a comprehensive rule file for Playwright MCP integration in Cursor AI, including installation, configuration with standardized viewports (mobile/tablet/desktop), and guidelines for AI-assisted web testing and webapp automation within the GridShift project.

## 2. Information Gathering & Analysis Log
* **Internal Files Analyzed:**
  - `/home/GridShift-Collective-Landing-v3/package.json` - Confirmed Playwright is already installed as dev dependency
  - `/home/GridShift-Collective-Landing-v3/tests/playwright-logo.spec.ts` - Found existing basic test structure
  - `/home/GridShift-Collective-Landing-v3/.cursor/rules/` - Verified empty rules directory exists

* **External Research & Key Findings:**
  - **Playwright Framework**: Node.js library for reliable cross-browser web automation and testing. Supports Chrome, Firefox, Safari, Edge with single API. Features auto-waiting, mobile emulation, and network interception.
  - **MCP Integration**: Microsoft's Playwright MCP server allows AI models to interact with browsers programmatically. Enables natural language test generation and execution.
  - **Cursor AI Integration**: Project-specific MCP configuration via `.cursor/mcp.json`. Supports global and per-project server configurations.
  - **Viewport Standards**: Industry standard viewports - Mobile: 390x844 (iPhone 12), Tablet: 834x1194 (iPad Pro 11), Desktop: 1920x1080 (Full HD)

## 3. Options Considered (Summary)
* **Option A: Manual Playwright Setup Only** - Basic configuration without MCP integration. Rejected because it misses AI augmentation capabilities.
* **Option B: Full AI-Driven Testing Suite** - Comprehensive MCP integration with advanced AI tools. Chosen as optimal path for modern development workflow.

## 4. Recommended Approach / Most Likely Root Cause & Fix

### Recommended Approach: Complete Playwright MCP Integration with Standardized Configuration

**Description:** Implement a complete Playwright MCP integration for the GridShift project, including proper configuration files, standardized viewports, and comprehensive Cursor AI usage guidelines. This will enable AI-assisted web testing and automation with consistent cross-device testing capabilities.

**Detailed Breakdown & Placement:**
- **MCP Configuration**: Add `.cursor/mcp.json` for project-specific Playwright server integration
- **Playwright Config**: Create `playwright.config.js` with standardized mobile/tablet/desktop viewports
- **Rule File**: Develop comprehensive `.cursor/rules/playwright-mcp-integration.md` with usage guidelines
- **Test Structure**: Leverage existing `/tests` directory with TypeScript-based test files

**Pros:**
- Enables AI-powered test generation from natural language descriptions
- Provides consistent cross-device testing with standardized viewports
- Integrates seamlessly with existing Cursor AI workflow
- Supports reliable, auto-waiting browser automation

**Cons / Risks:**
- Initial setup complexity for MCP configuration
- Learning curve for AI-assisted testing workflows
- Potential for flaky tests if locators aren't semantic

**Implementation/Fix Difficulty:** Medium

**Required Research / Next Steps:**
- Test MCP server connectivity and functionality
- Validate viewport configurations across different devices
- Develop sample AI-generated test cases for common GridShift scenarios

## 5. SPARC Seeds for Planning

### S — Specification Snapshot
- **Objectives**: Enable AI-assisted web testing, standardize cross-device testing, integrate Playwright MCP with Cursor AI
- **Constraints**: Must work with existing Vite/React/TypeScript stack, maintain project-specific configuration
- **Stakeholders**: Developers, QA engineers, AI-assisted development workflow
- **Success Metrics**: Successful MCP server connection, consistent test execution across viewports, AI-generated tests passing
- **Current-State Summary**: Playwright installed but not configured, no MCP integration, basic test exists

### P — Pseudocode Drafts
**End-to-end flow pseudocode:**
```
1. User describes test scenario in natural language
2. Cursor AI + Playwright MCP generates test code
3. Configure appropriate viewport (mobile/tablet/desktop)
4. Execute test across specified browser/device combinations
5. Validate assertions and generate reports
6. Iterate on test based on results
```

**Module-level pseudocode (MCP Integration):**
```
class PlaywrightMCPServer:
    def __init__(self, command="npx", args=["@playwright/mcp@latest"]):
        self.command = command
        self.args = args

    def connect_to_cursor():
        # Load .cursor/mcp.json configuration
        # Establish MCP connection
        # Register available tools

    def generate_test(description, viewport, assertions):
        # Parse natural language description
        # Map to Playwright actions and locators
        # Generate TypeScript test code
        # Apply specified viewport configuration
        # Include assertion statements
```

### A — Architecture Sketch
- **MCP Layer**: `.cursor/mcp.json` → Cursor AI → Playwright MCP Server → Browser Automation
- **Configuration Layer**: `playwright.config.js` → Projects (Desktop/Mobile/Tablet) → Device-specific viewports
- **Test Layer**: `/tests/*.spec.ts` → Test execution → HTML reports
- **Rule Layer**: `.cursor/rules/playwright-mcp-integration.md` → AI behavior guidelines → Consistent usage patterns

### R — Risks & Open Questions
- **Risks**: MCP server instability, inconsistent AI test generation, viewport compatibility issues
- **Open Questions**: How to handle dynamic content loading? What fallback strategies for MCP failures?
- **Assumptions**: Cursor AI has MCP support enabled, Playwright browsers are properly installed
- **Suggested Validations**: Test basic MCP connectivity, validate viewport rendering, run sample AI-generated tests
