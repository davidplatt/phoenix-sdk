/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPhoenixAPI } from './src/index'

// Example usage with defaults (localhost:8022)
async function example() {
  const api = createPhoenixAPI()

  // Or with custom configuration:
  // const api = createPhoenixAPI({
  //   baseURL: 'https://your-phoenix-host',
  //   port: 8022,
  //   timeout: 30000,
  // })

  try {
    // Get available stocks
    const stocks = await api.getStocksV2()
    console.log('Available stocks:', stocks.data)

    const projectId = 'your-project-id' // Replace with your actual project ID

    // Create a project with retry logic
    const project = await api.createJob(
      {
        id: projectId,
      },
      {
        timeoutMinutes: 10,
      }
    )

    console.log('Project created:', project.data)

    // Add an empty product
    await api.createProduct(projectId, {
      name: 'Test Product',
      height: '7 in',
      width: '5 in',
      ordered: 1500,
      stock: 'Test Stock',
      // ... other product properties
    })

    // Run Plan
    await api.runPlan(
      projectId,
      {
        profiles: ['Default'],
        // ... other plan properties
        'apply-result': true,
      },
      {
        timeoutMinutes: 10,
      }
    )

    // Export PDF with retry
    const pdfExport = await api.exportPdf(
      projectId,
      {
        // export configuration
      },
      {
        timeoutMinutes: 15,
      }
    )

    await api.deleteJob(projectId)

    console.log('PDF export:', pdfExport.data)
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null) {
      const err = error as { errors?: any; code?: any }
      console.error('Error:', err.errors || err.code || 'Unknown Error')
    } else {
      console.error('Error:', error)
    }
  }
}

example()
