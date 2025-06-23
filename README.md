# Phoenix API TypeScript SDK

> ⚠️ This is an unofficial SDK built and maintained independently. It is not affiliated with or endorsed by Esko or Tilia Labs.

A TypeScript SDK for interacting with the Phoenix API, featuring automatic retry logic for handling concurrency limits and robust error handling.

## Installation

```bash
npm install @davidplatt/phoenix-sdk
```

> Official Phoenix API (v23.11) Reference: [https://docs.tilialabs.com/phoenix/automation/restAPI/api/](https://docs.tilialabs.com/phoenix/automation/restAPI/api/)

## Quick Start

```typescript
import { PhoenixClient } from '@davidplatt/phoenix-sdk'
import { createPhoenixAPI } from '@davidplatt/phoenix-sdk'

// Initialize the default Phoenix API interface
const api = createPhoenixAPI()

// Example of typical Phoenix workflow:
// Create Project → Add Product → Run Plan → Export

// 1. Create a project
const projectId = 'MyProject'
const project = await api.createProject({ id: projectId })

// 2. Add a product to the project
const product = await api.createProduct(projectId, {
  name: 'Postcard',
  width: '7 in',
  height: '5 in',
  // ... other product properties
})

// 3. Run Plan to generate an imposition
await api.runPlan(projectId, {
  profiles: ['Default'],
  'apply-result': true,
})

// 4. Export the imposed job, optionally specifying a timeout
const pdfExport = await api.exportPdf(
  projectId,
  {
    path: '~/Desktop/imposed-job.pdf',
  },
  { timeoutMinutes: 5 }
)
```

## Features

- 🔄 **Automatic Retry Logic**: Handles 503 errors with exponential backoff
- 📝 **Full TypeScript Support**: Complete type definitions for all endpoints
- 🛡️ **Robust Error Handling**: Clean, actionable error messages with specific error types
- 🎯 **Complete API Coverage**: All Phoenix API endpoints implemented
- 🏗️ **Production Ready**: Comprehensive job, layout, and product management
- 🤖 **AI Integration**: Full support for Imposition AI, optimization, and planning
- 📊 **Export Everything**: Support for all export formats (PDF, JDF, DXF, etc.)
- 📚 **Library Management**: Complete CRUD operations for all library resources
- 📦 **Tree Shakeable**: Only import what you need
- 🎨 **Clean API**: Intuitive, consistent interface across all methods

## Why This Exists

The Phoenix API is powerful but low-level. After building several custom integrations, I created this SDK to simplify working with Phoenix across projects. By open-sourcing it, I hope to help other developers and teams build more quickly and reliably.

## API Reference

### Client Configuration

```typescript
interface PhoenixClientConfig {
  baseURL: string
  port: number
  timeout?: number
  headers?: Record<string, string>
}
```

### Retry Configuration

```typescript
interface RetryConfig {
  maxRetries?: number
  timeoutMinutes?: number
}
```

## Error Handling

The SDK provides clean, actionable error messages instead of raw HTTP responses:

```typescript
import {
  createPhoenixAPI,
  isProjectExistsError,
  isValidationError,
  PhoenixError,
} from '@davidplatt/phoenix-sdk'

const api = createPhoenixAPI()

try {
  const project = await api.createProject({ id: 'MyProject' })
} catch (error) {
  if (isProjectExistsError(error)) {
    console.log(`Project already exists: ${error.message}`)
    // Handle gracefully - maybe open existing project instead
    const existing = await api.openProject('MyProject')
  } else if (isValidationError(error)) {
    console.log('Invalid data:', error.message)
    console.log('Details:', error.details)
  } else if (error instanceof PhoenixError) {
    console.log(`API Error (${error.code}):`, error.message)
  }
}
```

### Error Types

- **ProjectExistsError**: Project with the same ID already exists
- **ResourceNotFoundError**: Requested resource doesn't exist
- **ValidationError**: Request data is invalid
- **ServiceUnavailableError**: Phoenix server is temporarily unavailable
- **TimeoutError**: Request exceeded the specified timeout
- **AuthenticationError**: Authentication credentials are invalid
- **AuthorizationError**: Insufficient permissions
- **RateLimitError**: Too many requests sent

### Error Properties

```typescript
interface PhoenixError {
  message: string // Human-readable error message
  code: string // Error code (e.g., 'PROJECT_EXISTS')
  statusCode?: number // HTTP status code
  details?: unknown // Additional error details from API
}
```

## Error Handling Examples

### Basic Error Handling

```typescript
try {
  const project = await api.createProject({ id: 'MyProject' })
} catch (error) {
  if (isProjectExistsError(error)) {
    // Project already exists - handle gracefully
    console.log('Project exists, opening instead...')
    const existing = await api.openProject('MyProject')
  } else {
    console.error('Failed to create project:', error.message)
  }
}
```

### Robust Project Creation

```typescript
async function createProjectAndDeleteIfExists(projectId: string) {
  try {
    const result = await api.createProject({ id: projectId })
    return { success: true, project: result.data, created: true }
  } catch (error) {
    if (isProjectExistsError(error)) {
      try {
        await api.deleteJob(projectId)
        await api.createProject({ id: projectId })
        return { success: true, project: existing.data, created: true }
      } catch (openError) {
        return {
          success: false,
          error: 'Project exists but cannot be recreated',
        }
      }
    }

    return {
      success: false,
      error: error instanceof PhoenixError ? error.message : String(error),
    }
  }
}
```

### Handling Service Unavailable

````typescript
try {
  const result = await api.runPlan(projectId, planConfig, { timeoutMinutes: 15 })
} catch (error) {
  if (isServiceUnavailableError(error)) {
    console.log(`Service busy, retry after ${error.retryAfter} seconds`)
    // The SDK automatically handles retries, but you can implement custom logic
  } else if (isTimeoutError(error)) {
    console.log('Plan took too long, consider increasing timeout')
  }
}
```

### Job Management

**Core Job Operations:**

- `getJobs()` - List all jobs
- `createJob(request, retryConfig?)` - Create a new job
- `openJobWithFile(file, retryConfig?)` - Open job from file
- `getJob(projectId)` - Get job details
- `updateJob(projectId, request)` - Update job
- `deleteJob(projectId)` - Delete a job
- `saveProject(projectId, request?)` - Save project
- `saveProjectTemplate(projectId, request, retryConfig?)` - Save as template
- `runJobScript(projectId, request, retryConfig?)` - Run script on job
- `snapProjectArtwork(projectId, retryConfig?)` - Snap artwork

### Export Methods

**Report Exports:**

- `exportJson(projectId, request, retryConfig?)` - Export JSON report
- `exportXml(projectId, request, retryConfig?)` - Export XML report
- `exportCsv(projectId, request, retryConfig?)` - Export CSV report
- `exportPdfReport(projectId, request, retryConfig?)` - Export PDF report
- `exportCoverSheet(projectId, request, retryConfig?)` - Export cover sheet
- `exportTilingReport(projectId, request, retryConfig?)` - Export tiling report
- `exportProductTilingReport(projectId, productName, request, retryConfig?)` - Product tiling report

**Die Exports:**

- `exportCff2(projectId, request, retryConfig?)` - Export CFF2 die
- `exportDxf(projectId, request, retryConfig?)` - Export DXF die
- `exportMfg(projectId, request, retryConfig?)` - Export MFG die
- `exportPdfCut(projectId, request, retryConfig?)` - Export PDF cut die
- `exportZcc(projectId, request, retryConfig?)` - Export ZCC die

**Production Exports:**

- `exportPdf(projectId, request, retryConfig?)` - Export imposed PDF
- `exportPdfVector(projectId, request, retryConfig?)` - Export vector PDF
- `exportJdf(projectId, request, retryConfig?)` - Export JDF
- `exportHpJdf(projectId, request, retryConfig?)` - Export HP JDF
- `exportCutJdf(projectId, request, retryConfig?)` - Export cutting JDF
- `exportCutKongsbergJdf(projectId, request, retryConfig?)` - Export Kongsberg JDF

### Layout Management

**Layout Operations:**

- `getLayouts(projectId, retryConfig?)` - Get all layouts
- `createLayout(projectId, request, retryConfig?)` - Create layout
- `getLayout(projectId, layoutIndex, retryConfig?)` - Get layout
- `editLayout(projectId, layoutIndex, request, retryConfig?)` - Edit layout
- `deleteLayout(projectId, layoutIndex, retryConfig?)` - Delete layout

**Layout Components:**

- `getLayoutFront(projectId, layoutIndex, retryConfig?)` - Get front side
- `editLayoutFront(projectId, layoutIndex, request, retryConfig?)` - Edit front
- `getLayoutBack(projectId, layoutIndex, retryConfig?)` - Get back side
- `editLayoutBack(projectId, layoutIndex, request, retryConfig?)` - Edit back
- `placeComponent(projectId, layoutIndex, request, retryConfig?)` - Place component
- `placeDieTemplate(projectId, layoutIndex, request, retryConfig?)` - Place die template

**Layout Settings:**

- `getLayoutPlate(projectId, layoutIndex, retryConfig?)` - Get plate settings
- `setLayoutPlate(projectId, layoutIndex, request, retryConfig?)` - Set plate
- `getLayoutPress(projectId, layoutIndex, retryConfig?)` - Get press settings
- `setLayoutPress(projectId, layoutIndex, request, retryConfig?)` - Set press
- `getLayoutSheet(projectId, layoutIndex, retryConfig?)` - Get sheet settings
- `setLayoutSheet(projectId, layoutIndex, request, retryConfig?)` - Set sheet
- `editLayoutSheet(projectId, layoutIndex, request, retryConfig?)` - Edit sheet
- `generateStepAndRepeat(projectId, layoutIndex, request, retryConfig?)` - Step & repeat

### Imposition AI

**Impose Tool:**

- `runImpose(projectId, request, layoutIndex, retryConfig?)` - Run impose
- `getImposeResults(projectId, layoutIndex, retryConfig?)` - Get results
- `getImposeResult(projectId, layoutIndex, resultId, retryConfig?)` - Get specific result
- `applyImposeResult(projectId, layoutIndex, resultId, retryConfig?)` - Apply result

**Optimize Tool:**

- `runOptimize(projectId, request, layoutIndex, retryConfig?)` - Run optimize
- `getOptimizeResults(projectId, layoutIndex, retryConfig?)` - Get results
- `getOptimizeResult(projectId, layoutIndex, resultId, retryConfig?)` - Get specific result
- `applyOptimizeResult(projectId, layoutIndex, resultId, retryConfig?)` - Apply result

**Populate Tool:**

- `runPopulate(projectId, request, layoutIndex, retryConfig?)` - Run populate
- `getPopulateResults(projectId, layoutIndex, retryConfig?)` - Get results
- `getPopulateResult(projectId, layoutIndex, resultId, retryConfig?)` - Get specific result
- `applyPopulateResult(projectId, layoutIndex, resultId, retryConfig?)` - Apply result

**Plan Tool:**

- `runPlan(projectId, request, retryConfig?)` - Run planning
- `startPlan(projectId, request, retryConfig?)` - Start planning
- `getPlanStatus(projectId, retryConfig?)` - Get plan status
- `stopPlan(projectId, retryConfig?)` - Stop planning
- `getPlanResults(projectId, retryConfig?)` - Get plan results
- `getPlanResult(projectId, resultId, retryConfig?)` - Get specific result
- `applyPlanResult(projectId, resultId, request, retryConfig?)` - Apply result
- `applyPartialPlan(projectId, startIndex, endIndex, resultId, request, retryConfig?)` - Apply partial Plan

### Product Management

**Product Operations:**

- `getProducts(projectId, retryConfig?)` - Get all products
- `createProduct(projectId, request, retryConfig?)` - Create product
- `getProduct(projectId, productName, retryConfig?)` - Get product
- `deleteProduct(projectId, productName, retryConfig?)` - Delete product
- `importProductCsv(projectId, request, retryConfig?)` - Import from CSV
- `traceProductImage(projectId, productName, request, retryConfig?)` - Trace image
- `applyProductMark(projectId, productName, request, retryConfig?)` - Apply mark
- `snapProduct(projectId, productName, retryConfig?)` - Snap product

### Project Management

**Project Operations:**

- `getProjects(retryConfig?)` - List all projects
- `createProject(request, retryConfig?)` - Create project
- `openProject(projectId, retryConfig?)` - Open project

**Project Products:**

- `getProjectProducts(projectId, retryConfig?)` - Get products
- `createBoundProduct(projectId, request, retryConfig?)` - Create bound product
- `createFlatProduct(projectId, request, retryConfig?)` - Create flat product
- `createFoldedProduct(projectId, request, retryConfig?)` - Create folded product
- `createTiledProduct(projectId, request, retryConfig?)` - Create tiled product
- `getProjectProduct(projectId, productName, retryConfig?)` - Get product
- `updateProjectProduct(projectId, productName, request, retryConfig?)` - Update product
- `deleteProjectProduct(projectId, productName, retryConfig?)` - Delete product

**Repeat Templates:**

- `getProjectRepeatTemplates(projectId, retryConfig?)` - Get templates
- `createProjectRepeatTemplate(projectId, request, retryConfig?)` - Create template
- `updateRepeatTemplate(projectId, templateName, request, retryConfig?)` - Update template
- `deleteRepeatTemplate(projectId, templateName, retryConfig?)` - Delete template

### File Management

**Output Files:**

- `getOutputFiles(projectId, retryConfig?)` - List output files
- `getOutputFile(projectId, fileId, retryConfig?)` - Get output file
- `downloadOutputFile(projectId, outputPath, fileId, retryConfig?)` - Download file

**Uploaded Files:**

- `getUploadedFiles(projectId, retryConfig?)` - List uploaded files
- `uploadFile(projectId, request, retryConfig?)` - Upload file
- `getUploadedFile(projectId, fileId, retryConfig?)` - Get uploaded file
- `downloadUploadedFile(projectId, fileId, outputPath, retryConfig?)` - Download file
- `deleteUploadedFile(projectId, fileId, retryConfig?)` - Delete file

### Library Management

**Scripts:**

- `getScripts()` - Get available scripts
- `getScript(scriptId, retryConfig?)` - Get specific script
- `addScript(request, retryConfig?)` - Add script
- `updateScript(scriptId, request, retryConfig?)` - Update script
- `deleteScript(scriptId, retryConfig?)` - Delete script
- `runScript(request, retryConfig?)` - Run script
- `runProjectScript(projectId, request, retryConfig?)` - Run on project

**Stocks:**

- `getStocks()` - Get stock library
- `getStock(stockId, retryConfig?)` - Get specific stock
- `addStock(request, retryConfig?)` - Add stock
- `updateStock(stockId, request, retryConfig?)` - Update stock
- `deleteStock(stockId, retryConfig?)` - Delete stock
- `getStockGrades(stockId, retryConfig?)` - Get grades
- `addStockGrade(stockId, request, retryConfig?)` - Add grade
- `getStockGradeRolls(stockId, gradeId, retryConfig?)` - Get rolls
- `getStockGradeSheets(stockId, gradeId, retryConfig?)` - Get sheets

**Die Designs:**

- `getDieDesigns()` - Get die design library
- `getDieDesign(designId, retryConfig?)` - Get specific design
- `importDieDesign(request, retryConfig?)` - Import design
- `deleteDieDesign(designId, retryConfig?)` - Delete design
- `importDieTemplate(projectId, request, retryConfig?)` - Import to project

**Templates:**

- `getTemplates()` - Get template library
- `getTemplate(templateId, retryConfig?)` - Get specific template
- `addTemplate(request, retryConfig?)` - Add template
- `deleteTemplate(templateId, retryConfig?)` - Delete template

**Folding Patterns:**

- `getFoldingPatterns()` - Get folding patterns (v1)
- `getFoldingPatternsV2()` - Get folding patterns (v2)
- `getFoldingPattern(patternId, retryConfig?)` - Get specific pattern
- `addFoldingPattern(request, retryConfig?)` - Add pattern
- `updateFoldingPattern(patternId, request, retryConfig?)` - Update pattern
- `deleteFoldingPattern(patternId, retryConfig?)` - Delete pattern

**Marks:**

- `getMarks()` - Get marks library (v1)
- `getMarksV2()` - Get marks library (v2)
- `getMarkSets()` - Get mark sets
- `getMark(markId, retryConfig?)` - Get specific mark
- `addMark(request, retryConfig?)` - Add mark
- `updateMark(markId, request, retryConfig?)` - Update mark
- `deleteMark(markId, retryConfig?)` - Delete mark

**Things:**

- `getPresses()` - Get press library
- `getPress(pressId, retryConfig?)` - Get specific press
- `addPress(request, retryConfig?)` - Add press
- `updatePress(pressId, request, retryConfig?)` - Update press
- `deletePress(pressId, retryConfig?)` - Delete press
- `getPlates()` - Get plate library
- `getModes()` - Get mode library
- `getProcesses()` - Get process library
- `getProcessTypes()` - Get process type library

**Tiling:**

- `getTilingPresets()` - Get tiling presets
- `getTilingPreset(presetId, retryConfig?)` - Get specific preset
- `addTilingPreset(request, retryConfig?)` - Add preset
- `updateTilingPreset(presetId, request, retryConfig?)` - Update preset
- `deleteTilingPreset(presetId, retryConfig?)` - Delete preset

### Preset Management

**Import Presets:**

- `getProductCsvImportPresets()` - Product CSV import presets
- `getStockCsvImportPresets()` - Stock CSV import presets
- `getArdDieImportPresets()` - ARD die import presets
- `getCff2DieImportPresets()` - CFF2 die import presets
- `getDdes2DieImportPresets()` - DDES2 die import presets
- `getDdes3DieImportPresets()` - DDES3 die import presets
- `getDxfDieImportPresets()` - DXF die import presets
- `getMFGDieImportPresets()` - MFG die import presets
- `getPdfDieImportPresets()` - PDF die import presets

**Export Presets:**

- `getCoverSheetExportPresets()` - Cover sheet export presets
- `getCsvReportExportPresets()` - CSV report export presets
- `getJsonReportExportPresets()` - JSON report export presets
- `getPdfReportExportPresets()` - PDF report export presets
- `getXmlReportExportPresets()` - XML report export presets
- `getCff2DieExportPresets()` - CFF2 die export presets
- `getDxfDieExportPresets()` - DXF die export presets
- `getPdfDieExportPresets()` - PDF die export presets
- `getZccDieExportPresets()` - ZCC die export presets
- `getImposedPDFExportPresets()` - Imposed PDF export presets
- `getVectorSeparationExportPresets()` - Vector separation presets
- `getHpJdfExportPresets()` - HP JDF export presets
- `getJdfExportPresets()` - JDF export presets
- `getJdfCuttingExportPresets()` - JDF cutting export presets
- `getJdfKongsbergExportPresets()` - JDF Kongsberg export presets

**Imposition Presets:**

- `getImpositionAiProfilesV2()` - Imposition AI profiles
- `getImpositionAiProfile(profileId, retryConfig?)` - Get AI profile
- `addImpositionAiProfile(request, retryConfig?)` - Add AI profile
- `updateImpositionAiProfile(profileId, request, retryConfig?)` - Update AI profile
- `deleteImpositionAiProfile(profileId, retryConfig?)` - Delete AI profile
- `getStepAndRepeatPresets()` - Step and repeat presets
- `getProductTilingPresets()` - Product tiling presets

**Mappings:**

- `getDynamicInkMappingPresets()` - Dynamic ink mapping presets
- `getDynamicKeywordMappings()` - Dynamic keyword mappings

## License

MIT

## Contributing

Issues and PRs are welcome! Please open a GitHub issue first if you’re planning a large feature or change.

This project is intentionally lightweight and focused on API communication and consistency, not workflow logic.
````
