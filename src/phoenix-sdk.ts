import { PhoenixClient, RetryConfig } from './client'
import { AxiosResponse } from 'axios'
import { components } from './types/phoenix-types'

/**
 * Main API class for interacting with the Phoenix printing and imposition system.
 * Provides methods for job management, layout operations, export functions, and library management.
 */
export class PhoenixAPI {
  /**
   * Creates a new PhoenixAPI instance.
   *
   * @param client - The PhoenixClient instance to use for HTTP requests
   */
  constructor(private client: PhoenixClient) {}

  /**
   * Retrieves a list of all jobs/projects.
   *
   * @returns Promise resolving to an array of Phoenix projects
   */
  async getJobs(): Promise<
    AxiosResponse<components['schemas']['PhoenixProject'][]>
  > {
    return this.client.request('GET', `/jobs/`)
  }

  /**
   * Creates a new job/project.
   *
   * @param request - Job creation parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async createJob(
    request: components['schemas']['CreateJobResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', '/jobs', request, retryConfig)
  }

  /**
   * Opens a job by uploading a Phoenix job file (.phx).
   *
   * @param file - The file to upload and open as a job
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async openJobWithFile(
    file: File,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    const formData = new FormData()
    formData.append('file', file)

    return this.client.request('POST', '/jobs/open', formData, retryConfig)
  }

  /**
   * Retrieves details for a specific job/project.
   *
   * @param projectId - The unique identifier of the project
   * @returns Promise resolving to the project details
   */
  async getJob(
    projectId: string
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('GET', `/jobs/${projectId}`)
  }

  /**
   * Deletes a job/project.
   *
   * @param projectId - The unique identifier of the project to delete
   * @returns Promise resolving to the operation response
   */
  async deleteJob(
    projectId: string
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('DELETE', `/jobs/${projectId}`)
  }

  /**
   * Updates an existing job/project with new settings.
   *
   * @param projectId - The unique identifier of the project to update
   * @param request - The project update parameters
   * @returns Promise resolving to the operation response
   */
  async updateJob(
    projectId: string,
    request: components['schemas']['EditProjectResource']
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('PATCH', `/jobs/${projectId}`, request)
  }

  /**
   * Exports a project report in JSON format.
   *
   * @param projectId - The unique identifier of the project
   * @param request - JSON export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportJson(
    projectId: string,
    request: components['schemas']['ExportJsonReportResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/report/json`,
      request,
      retryConfig
    )
  }

  /**
   * Exports a project report in XML format.
   *
   * @param projectId - The unique identifier of the project
   * @param request - XML export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportXml(
    projectId: string,
    request: components['schemas']['ExportXmlReportResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/report/xml`,
      request,
      retryConfig
    )
  }

  /**
   * Exports a cover sheet for the project.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Cover sheet export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportCoverSheet(
    projectId: string,
    request: components['schemas']['ExportCoverSheetResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/cover-sheet`,
      request,
      retryConfig
    )
  }

  /**
   * Exports a project report in CSV format.
   *
   * @param projectId - The unique identifier of the project
   * @param request - CSV export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportCsv(
    projectId: string,
    request: components['schemas']['ExportCsvReportResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/report/csv`,
      request,
      retryConfig
    )
  }

  /**
   * Exports a tiling report for a specific product.
   *
   * @param projectId - The unique identifier of the project
   * @param productName - The name of the product
   * @param request - Tiling report export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportProductTilingReport(
    projectId: string,
    productName: string,
    request: components['schemas']['ExportTilingReportResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/products/${productName}/export/tiling-report`,
      request,
      retryConfig
    )
  }

  /**
   * Exports die layout in CFF2 format.
   *
   * @param projectId - The unique identifier of the project
   * @param request - CFF2 export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportCff2(
    projectId: string,
    request: components['schemas']['ExportCff2LayoutResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/die/cff2`,
      request,
      retryConfig
    )
  }

  /**
   * Exports die layout in DXF format.
   *
   * @param projectId - The unique identifier of the project
   * @param request - DXF export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportDxf(
    projectId: string,
    request: components['schemas']['ExportDxfLayoutResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/die/dxf`,
      request,
      retryConfig
    )
  }

  /**
   * Exports die layout in MFG format.
   *
   * @param projectId - The unique identifier of the project
   * @param request - MFG export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportMfg(
    projectId: string,
    request: components['schemas']['ExportMfgLayoutResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/die/mfg`,
      request,
      retryConfig
    )
  }

  /**
   * Exports die cutting layout in PDF format.
   *
   * @param projectId - The unique identifier of the project
   * @param request - PDF cutting layout export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportPdfCut(
    projectId: string,
    request: components['schemas']['ExportPdfLayoutResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/die/pdf`,
      request,
      retryConfig
    )
  }

  /**
   * Exports die layout in ZCC format.
   *
   * @param projectId - The unique identifier of the project
   * @param request - ZCC export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportZcc(
    projectId: string,
    request: components['schemas']['ExportZccLayoutResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/die/zcc`,
      request,
      retryConfig
    )
  }

  /**
   * Exports HP JDF file.
   *
   * @param projectId - The unique identifier of the project
   * @param request - HP JDF export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportHpJdf(
    projectId: string,
    request: components['schemas']['ExportHpJdfResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/hp-jdf`,
      request,
      retryConfig
    )
  }

  /**
   * Exports standard JDF file.
   *
   * @param projectId - The unique identifier of the project
   * @param request - JDF export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportJdf(
    projectId: string,
    request: components['schemas']['ExportJdfResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/jdf`,
      request,
      retryConfig
    )
  }

  /**
   * Exports JDF cutting file.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Cutting JDF export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportCutJdf(
    projectId: string,
    request: components['schemas']['ExportCuttingJdfResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/jdf-cutting`,
      request,
      retryConfig
    )
  }

  /**
   * Exports JDF file for Kongsberg cutting operations.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Kongsberg JDF export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportCutKongsbergJdf(
    projectId: string,
    request: components['schemas']['ExportKongsbergJdfResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/jdf-kongsberg`,
      request,
      retryConfig
    )
  }

  /**
   * Exports the imposed project as PDF.
   *
   * @param projectId - The unique identifier of the project
   * @param request - PDF export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportPdf(
    projectId: string,
    request: components['schemas']['ExportPdfResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/pdf`,
      request,
      retryConfig
    )
  }

  /**
   * Exports a project report PDF.
   *
   * @param projectId - The unique identifier of the project
   * @param request - PDF report export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportPdfReport(
    projectId: string,
    request: components['schemas']['ExportPdfReportResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/report/pdf`,
      request,
      retryConfig
    )
  }

  /**
   * Exports vector separations as PDF.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Vector separation export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportPdfVector(
    projectId: string,
    request: components['schemas']['ExportVectorSeparationResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/pdf-vector`,
      request,
      retryConfig
    )
  }

  /**
   * Exports a tiling report for the project.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Tiling report export configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the export operation response
   */
  async exportTilingReport(
    projectId: string,
    request: components['schemas']['ExportTilingReportResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/tiling-report`,
      request,
      retryConfig
    )
  }

  /**
   * Imports a die template into the project.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Die template import configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the import operation response
   */
  async importDieTemplate(
    projectId: string,
    request: components['schemas']['ImportDieTemplateResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/import/die-template`,
      request,
      retryConfig
    )
  }

  /**
   * Applies an impose result to a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param resultid - The ID of the imposition result to apply
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async applyImposeResult(
    projectId: string,
    layoutindex: number,
    resultid: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/impose/${layoutindex}/result/${resultid}/apply`,
      retryConfig
    )
  }

  /**
   * Runs the impose tool on a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Imposition configuration parameters
   * @param layoutindex - The index of the layout to impose
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the imposition operation response
   */
  async runImpose(
    projectId: string,
    request: components['schemas']['ImposeResource'],
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/impose/${layoutindex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific result of the impose tool.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param resultid - The ID of the imposition result
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the imposition result details
   */
  async getImposeResult(
    projectId: string,
    layoutindex: number,
    resultid: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['LayoutResultEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/impose/${layoutindex}/result/${resultid}`,
      retryConfig
    )
  }

  /**
   * Retrieves all impose results for a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to an array of imposition results
   */
  async getImposeResults(
    projectId: string,
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['LayoutResultEntity'][]>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/impose/${layoutindex}/results`,
      retryConfig
    )
  }

  /**
   * Retrieves all layouts for a project.
   *
   * @param projectId - The unique identifier of the project
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to an array of layout entities
   */
  async getLayouts(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PhoenixLayoutEntity'][]>> {
    return this.client.request('GET', `/jobs/${projectId}/layouts`, retryConfig)
  }

  /**
   * Creates a new layout in the project.
   *
   * @param projectId - The unique identifier of the project
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async createLayout(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/layouts`,
      undefined,
      retryConfig
    )
  }

  /**
   * Retrieves the back surface configuration of a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the back surface entity
   */
  async getLayoutBack(
    projectId: string,
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['SurfaceEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/layouts/${layoutindex}/back`,
      retryConfig
    )
  }

  /**
   * Edits the back surface configuration of a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param request - Surface configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async editLayoutBack(
    projectId: string,
    layoutindex: number,
    request: components['schemas']['EditLayoutSurfaceResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/jobs/${projectId}/layouts/${layoutindex}/back`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves details for a specific layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the layout entity
   */
  async getLayout(
    projectId: string,
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PhoenixLayoutEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/layouts/${layoutindex}`,
      retryConfig
    )
  }

  /**
   * Edits the configuration of a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param request - Layout configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async editLayout(
    projectId: string,
    layoutindex: number,
    request: components['schemas']['EditLayoutResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/jobs/${projectId}/layouts/${layoutindex}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a layout from the project.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout to delete
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async deleteLayout(
    projectId: string,
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/jobs/${projectId}/layouts/${layoutindex}`,
      retryConfig
    )
  }

  /**
   * Retrieves the front surface configuration of a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the front surface entity
   */
  async getLayoutFront(
    projectId: string,
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['SurfaceEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/layouts/${layoutindex}/front`,
      retryConfig
    )
  }

  /**
   * Edits the front surface configuration of a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param request - Surface configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async editLayoutFront(
    projectId: string,
    layoutindex: number,
    request: components['schemas']['EditLayoutSurfaceResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/jobs/${projectId}/layouts/${layoutindex}/front`,
      request,
      retryConfig
    )
  }

  /**
   * Places a component on a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param request - Component placement parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async placeComponent(
    projectId: string,
    layoutindex: number,
    request: components['schemas']['PlaceComponentResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/layouts/${layoutindex}/place/component`,
      request,
      retryConfig
    )
  }

  /**
   * Places a die template on a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param request - Die template placement parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async placeDieTemplate(
    projectId: string,
    layoutindex: number,
    request: components['schemas']['PlaceComponentResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/layouts/${layoutindex}/place/die-template`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves the plate configuration for a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the plate entity
   */
  async getLayoutPlate(
    projectId: string,
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PlateEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/layouts/${layoutindex}/plate`,
      retryConfig
    )
  }

  /**
   * Sets the plate configuration for a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param request - Plate configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async setLayoutPlate(
    projectId: string,
    layoutindex: number,
    request: components['schemas']['SetPlateResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/layouts/${layoutindex}/plate`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves the press configuration for a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the press entity
   */
  async getLayoutPress(
    projectId: string,
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PressEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/layouts/${layoutindex}/press`,
      retryConfig
    )
  }

  /**
   * Sets the press configuration for a layout.
   *
   * @deprecated This method is deprecated
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param request - Press configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async setLayoutPress(
    projectId: string,
    layoutindex: number,
    request: components['schemas']['SetPressResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/layouts/${layoutindex}/press`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves the sheet configuration for a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the sheet entity
   */
  async getLayoutSheet(
    projectId: string,
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['SheetEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/layouts/${layoutindex}/sheet`,
      retryConfig
    )
  }

  /**
   * Sets the sheet configuration for a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param request - Sheet configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async setLayoutSheet(
    projectId: string,
    layoutindex: number,
    request: components['schemas']['SetSheetResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/layouts/${layoutindex}/sheet`,
      request,
      retryConfig
    )
  }

  /**
   * Edits the sheet size and configuration for a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param request - Sheet resize parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async editLayoutSheet(
    projectId: string,
    layoutindex: number,
    request: components['schemas']['ResizeSheetResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/jobs/${projectId}/layouts/${layoutindex}/sheet`,
      request,
      retryConfig
    )
  }

  /**
   * Generates a step and repeat pattern on a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param request - Step and repeat configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async generateStepAndRepeat(
    projectId: string,
    layoutindex: number,
    request: components['schemas']['StepRepeatResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/layouts/${layoutindex}/step-repeat`,
      request,
      retryConfig
    )
  }

  /**
   * Applies an optimize result to a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param resultid - The ID of the optimize result to apply
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async applyOptimizeResult(
    projectId: string,
    layoutindex: number,
    resultid: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/optimize/${layoutindex}/result/${resultid}/apply`,
      retryConfig
    )
  }

  /**
   * Runs optimize on a layout to improve placement efficiency.
   *
   * @param projectId - The unique identifier of the project
   * @param request - optimize configuration parameters
   * @param layoutindex - The index of the layout to optimize
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the optimize operation response
   */
  async runOptimize(
    projectId: string,
    request: components['schemas']['OptimizeResource'],
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/optimize/${layoutindex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific optimize result.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param resultid - The ID of the optimize result
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the optimize result details
   */
  async getOptimizeResult(
    projectId: string,
    layoutindex: number,
    resultid: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['LayoutResultEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/optimize/${layoutindex}/result/${resultid}`,
      retryConfig
    )
  }

  /**
   * Retrieves all optimize results for a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to an array of optimize results
   */
  async getOptimizeResults(
    projectId: string,
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['LayoutResultEntity'][]>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/optimize/${layoutindex}/results`,
      retryConfig
    )
  }

  /**
   * Retrieves information about a specific output file.
   *
   * @param projectId - The unique identifier of the project
   * @param fileId - The unique identifier of the output file
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the output file entity
   */
  async getOutputFile(
    projectId: string,
    fileId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['JobFilesEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/output/${fileId}`,
      retryConfig
    )
  }

  /**
   * Downloads a specific output file.
   *
   * @param projectId - The unique identifier of the project
   * @param filePath - The path to the file within the output
   * @param fileId - The unique identifier of the output file
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the file content
   */
  async downloadOutputFile(
    projectId: string,
    filePath: string,
    fileId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<string[]>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/output/${fileId}/${filePath}`,
      retryConfig
    )
  }

  /**
   * Retrieves a list of all output files for a project.
   *
   * @param projectId - The unique identifier of the project
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to an array of output file entities
   */
  async getOutputFiles(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['JobFilesEntity'][]>> {
    return this.client.request('GET', `/jobs/${projectId}/output`, retryConfig)
  }

  /**
   * Applies a partial plan result to specific layout indices.
   *
   * @param projectId - The unique identifier of the project
   * @param startIndex - The starting layout index
   * @param endIndex - The ending layout index
   * @param resultId - The ID of the plan result to apply
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async applyPartialPlan(
    projectId: string,
    startIndex: number,
    endIndex: number,
    resultId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/plan/results/${resultId}/apply/${startIndex}/${endIndex}`,
      undefined,
      retryConfig
    )
  }

  /**
   * Applies a complete plan result to the project.
   *
   * @param projectId - The unique identifier of the project
   * @param resultId - The ID of the plan result to apply
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async applyPlanResult(
    projectId: string,
    resultId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/plan/results/${resultId}/apply`,
      undefined,
      retryConfig
    )
  }

  /**
   * Runs planning operation to generate layout arrangements.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Planning configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the planning operation response
   */
  async runPlan(
    projectId: string,
    request: components['schemas']['PlanResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/plan`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific plan result.
   *
   * @param projectId - The unique identifier of the project
   * @param resultId - The ID of the plan result
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the plan result details
   */
  async getPlanResult(
    projectId: string,
    resultId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PlanResultEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/plan/results/${resultId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all plan results for a project.
   *
   * @param projectId - The unique identifier of the project
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to an array of plan results
   */
  async getPlanResults(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PlanResultEntity'][]>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/plan/results`,
      retryConfig
    )
  }

  /**
   * Starts an asynchronous planning operation.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Planning configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async startPlan(
    projectId: string,
    request: components['schemas']['PlanResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/plan/start`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves the current status of a planning operation.
   *
   * @param projectId - The unique identifier of the project
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the plan status
   */
  async getPlanStatus(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PlanStatusEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/plan/status`,
      retryConfig
    )
  }

  /**
   * Stops a running planning operation.
   *
   * @param projectId - The unique identifier of the project
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async stopPlan(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/plan/stop`,
      retryConfig
    )
  }

  /**
   * Applies a populate result to a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param resultid - The ID of the populate result to apply
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async applyPopulateResult(
    projectId: string,
    layoutindex: number,
    resultid: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/populate/${layoutindex}/result/${resultid}/apply`,
      retryConfig
    )
  }

  /**
   * Runs populate operation to fill a layout with products.
   *
   * @param projectId - The unique identifier of the project
   * @param request - populate configuration parameters
   * @param layoutindex - The index of the layout to populate
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the populate operation response
   */
  async runPopulate(
    projectId: string,
    request: components['schemas']['PopulateResource'],
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/populate/${layoutindex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific populate result.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param resultid - The ID of the populate result
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the populate result details
   */
  async getPopulateResult(
    projectId: string,
    layoutindex: number,
    resultid: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['LayoutResultEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/populate/${layoutindex}/result/${resultid}`,
      retryConfig
    )
  }

  /**
   * Retrieves all populate results for a layout.
   *
   * @param projectId - The unique identifier of the project
   * @param layoutindex - The index of the layout
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to an array of populate results
   */
  async getPopulateResults(
    projectId: string,
    layoutindex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['LayoutResultEntity'][]>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/populate/${layoutindex}/results`,
      retryConfig
    )
  }

  /**
   * Retrieves all products for a project with optional rendering parameters.
   *
   * @param projectId - The unique identifier of the project
   * @param queryParams - Optional query parameters for thumbnails and rendering
   * @param queryParams.thumb - Whether to include thumbnails
   * @param queryParams.thumb-width - Width of thumbnails in pixels
   * @param queryParams.thumb-height - Height of thumbnails in pixels
   * @param queryParams.render-mode - Rendering mode for thumbnails
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to an array of product entities
   */
  async getProducts(
    projectId: string,
    queryParams?: {
      thumb?: boolean
      'thumb-width'?: number
      'thumb-height'?: number
      'render-mode'?: 'Artwork' | 'Colors' | 'Dielines'
    },
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PhoenixProductEntity'][]>> {
    return this.client.request('GET', `/jobs/${projectId}/products`, {
      ...retryConfig,
      params: queryParams,
    })
  }

  /**
   * Retrieves all products for a project (version 2) with optional rendering parameters.
   *
   * @param projectId - The unique identifier of the project
   * @param queryParams - Optional query parameters for thumbnails and rendering
   * @param queryParams.thumb - Whether to include thumbnails
   * @param queryParams.thumb-width - Width of thumbnails in pixels
   * @param queryParams.thumb-height - Height of thumbnails in pixels
   * @param queryParams.render-mode - Rendering mode for thumbnails
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to an array of product entities
   */
  async getProductsV2(
    projectId: string,
    queryParams?: {
      thumb?: boolean
      'thumb-width'?: number
      'thumb-height'?: number
      'render-mode'?: 'Artwork' | 'Colors' | 'Dielines'
    },
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PhoenixProductEntity'][]>> {
    return this.client.request('GET', `/jobs/${projectId}/products`, {
      ...retryConfig,
      params: queryParams,
    })
  }

  /**
   * Creates a new product in the project.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Product creation parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async createProduct(
    projectId: string,
    request: components['schemas']['AddProductEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/products`,
      request,
      retryConfig
    )
  }

  /**
   * Imports products from a CSV file.
   *
   * @param projectId - The unique identifier of the project
   * @param request - CSV import configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the import operation response
   */
  async importProductCsv(
    projectId: string,
    request: components['schemas']['ImportProductCsvResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/products/import/csv`,
      request,
      retryConfig
    )
  }

  /**
   * Traces an image to create vector paths for a product.
   *
   * @param projectId - The unique identifier of the project
   * @param productName - The name of the product
   * @param request - Image tracing configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the tracing operation response
   */
  async traceProductImage(
    projectId: string,
    productName: string,
    request: components['schemas']['ImageTracingResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/products/${productName}/image-tracing`,
      request,
      retryConfig
    )
  }

  /**
   * Applies a mark to a product.
   *
   * @param projectId - The unique identifier of the project
   * @param productName - The name of the product
   * @param request - Mark application parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async applyProductMark(
    projectId: string,
    productName: string,
    request: components['schemas']['ApplyMarkResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/products/${productName}/mark/apply`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves details for a specific product.
   *
   * @param projectId - The unique identifier of the project
   * @param productName - The name of the product
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the product entity
   */
  async getProduct(
    projectId: string,
    productName: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PhoenixProductEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/products/${productName}`,
      retryConfig
    )
  }

  /**
   * Deletes a product from the project.
   *
   * @param projectId - The unique identifier of the project
   * @param productName - The name of the product to delete
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async deleteProduct(
    projectId: string,
    productName: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/jobs/${projectId}/products/${productName}`,
      retryConfig
    )
  }

  /**
   * Snaps a product to align with layout constraints.
   *
   * @param projectId - The unique identifier of the project
   * @param productName - The name of the product to snap
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async snapProduct(
    projectId: string,
    productName: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/products/${productName}/snap`,
      retryConfig
    )
  }

  /**
   * Saves the current state of a project.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Optional save configuration parameters
   * @returns Promise resolving to the operation response
   */
  async saveProject(
    projectId: string,
    request?: components['schemas']['SaveJobResource']
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', `/jobs/${projectId}/save`, request)
  }

  /**
   * Saves a project as a reusable template.
   *
   * @param projectId - The unique identifier of the project
   * @param request - Template save configuration parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async saveProjectTemplate(
    projectId: string,
    request: components['schemas']['SaveJobTemplateResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/save-template`,
      request,
      retryConfig
    )
  }

  /**
   * Runs a script on a job/project.
   *
   * @deprecated Use runProjectScript instead
   * @param projectId - The unique identifier of the project
   * @param request - Script execution parameters
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the script execution response
   */
  async runJobScript(
    projectId: string,
    request: components['schemas']['RunScriptResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/script`,
      request,
      retryConfig
    )
  }

  /**
   * Snaps all artwork in the project to align with layout constraints.
   *
   * @param projectId - The unique identifier of the project
   * @param retryConfig - Optional retry configuration for long-running operations
   * @returns Promise resolving to the operation response
   */
  async snapProjectArtwork(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', `/jobs/${projectId}/snap`, retryConfig)
  }

  /**
   * Retrieves information about a specific uploaded file
   * @param projectId - The project identifier
   * @param fileId - The file identifier
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the uploaded file entity
   */
  async getUploadedFile(
    projectId: string,
    fileId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['JobFilesEntity']>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/files/upload/${fileId}`,
      retryConfig
    )
  }

  /**
   * Deletes a specific uploaded file
   * @param projectId - The project identifier
   * @param fileId - The file identifier
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteUploadedFile(
    projectId: string,
    fileId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/jobs/${projectId}/files/upload/${fileId}`,
      retryConfig
    )
  }

  /**
   * Downloads a specific uploaded file
   * @param projectId - The project identifier
   * @param fileId - The file identifier
   * @param outputPath - The output path for the download
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of strings
   */
  async downloadUploadedFile(
    projectId: string,
    fileId: string,
    outputPath: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<string[]>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/files/upload/${fileId}/${outputPath}`,
      retryConfig
    )
  }

  /**
   * Retrieves all uploaded files for a project
   * @param projectId - The project identifier
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of uploaded file entities
   */
  async getUploadedFiles(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['JobFilesEntity'][]>> {
    return this.client.request(
      'GET',
      `/jobs/${projectId}/files/upload`,
      retryConfig
    )
  }

  /**
   * Uploads a file to a project
   * @param projectId - The project identifier
   * @param request - The form data content disposition
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async uploadFile(
    projectId: string,
    request: components['schemas']['FormDataContentDisposition'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/files/upload`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves all projects
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of Phoenix projects
   */
  async getProjects(
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PhoenixProject'][]>> {
    return this.client.request('GET', '/projects', retryConfig)
  }

  /**
   * Creates a new project
   * @param request - The create job resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async createProject(
    request: components['schemas']['CreateJobResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', '/projects', request, retryConfig)
  }

  /**
   * Opens a specific project
   * @param projectId - The project identifier
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async openProject(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/projects/${projectId}/open`,
      retryConfig
    )
  }

  /**
   * Retrieves repeat templates for a project
   * @param projectId - The project identifier
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of repeat templates
   */
  async getProjectRepeatTemplates(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['repeat-template'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/repeat-templates`,
      retryConfig
    )
  }

  /**
   * Creates a repeat template for a project
   * @param projectId - The project identifier
   * @param request - The repeat template settings
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async createProjectRepeatTemplate(
    projectId: string,
    request: components['schemas']['repeat-template-settings'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/projects/${projectId}/repeat-templates`,
      request,
      retryConfig
    )
  }

  /**
   * Creates a bound product for a project
   * @param projectId - The project identifier
   * @param request - The create bound product resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async createBoundProduct(
    projectId: string,
    request: components['schemas']['create-bound-product-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/projects/${projectId}/products/bound`,
      request,
      retryConfig
    )
  }

  /**
   * Creates a flat product for a project
   * @param projectId - The project identifier
   * @param request - The create flat product resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async createFlatProduct(
    projectId: string,
    request: components['schemas']['create-flat-product-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/projects/${projectId}/products/flat`,
      request,
      retryConfig
    )
  }

  /**
   * Creates a folded product for a project
   * @param projectId - The project identifier
   * @param request - The create folded product resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async createFoldedProduct(
    projectId: string,
    request: components['schemas']['create-folded-product-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/projects/${projectId}/products/folded`,
      request,
      retryConfig
    )
  }

  /**
   * Creates a tiled product for a project
   * @param projectId - The project identifier
   * @param request - The create tiled product resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async createTiledProduct(
    projectId: string,
    request: components['schemas']['create-tiled-product-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/projects/${projectId}/products/tiled`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves all products for a project
   * @param projectId - The project identifier
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of products
   */
  async getProjectProducts(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['product'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products`,
      retryConfig
    )
  }

  /**
   * Retrieves bound product parts
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of bound parts
   */
  async getBoundProductParts(
    projectId: string,
    productName: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['bound-part'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/bound-parts`,
      retryConfig
    )
  }

  /**
   * Retrieves a specific bound product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the bound part
   */
  async getBoundProductPart(
    projectId: string,
    productName: string,
    partIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['bound-part']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/bound-parts/${partIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a bound product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param request - The edit bound part resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateBoundProductPart(
    projectId: string,
    productName: string,
    partIndex: number,
    request: components['schemas']['edit-bound-part-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}/bound-parts/${partIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves sections for a bound product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of bound sections
   */
  async getBoundProductPartSections(
    projectId: string,
    productName: string,
    partIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['bound-section'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/bound-parts/${partIndex}/sections`,
      retryConfig
    )
  }

  /**
   * Creates a section for a bound product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param request - The edit section resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the bound section
   */
  async createBoundProductPartSection(
    projectId: string,
    productName: string,
    partIndex: number,
    request: components['schemas']['edit-section-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['bound-section']>> {
    return this.client.request(
      'POST',
      `/projects/${projectId}/products/${productName}/bound-parts/${partIndex}/sections`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific bound product part section
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param sectionIndex - The section index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async getBoundProductPartSection(
    projectId: string,
    productName: string,
    partIndex: number,
    sectionIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/bound-parts/${partIndex}/sections/${sectionIndex}`,
      retryConfig
    )
  }

  /**
   * Deletes a bound product part section
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param sectionIndex - The section index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteBoundProductPartSection(
    projectId: string,
    productName: string,
    partIndex: number,
    sectionIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/projects/${projectId}/products/${productName}/bound-parts/${partIndex}/sections/${sectionIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a bound product part section
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param sectionIndex - The section index
   * @param request - The edit section resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateBoundProductPartSection(
    projectId: string,
    productName: string,
    partIndex: number,
    sectionIndex: number,
    request: components['schemas']['edit-section-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}/bound-parts/${partIndex}/sections/${sectionIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves signatures for a bound product section
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param sectionIndex - The section index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of bound signatures
   */
  async getBoundProductSectionSignatures(
    projectId: string,
    productName: string,
    partIndex: number,
    sectionIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['bound-signature'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/bound-parts/${partIndex}/sections/${sectionIndex}/signatures`,
      retryConfig
    )
  }

  /**
   * Creates a signature for a bound product section
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param sectionIndex - The section index
   * @param request - The add signatures resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async createBoundProductSectionSignature(
    projectId: string,
    productName: string,
    partIndex: number,
    sectionIndex: number,
    request: components['schemas']['AddSignaturesResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/projects/${projectId}/products/${productName}/bound-parts/${partIndex}/sections/${sectionIndex}/signatures`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific bound product signature
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param sectionIndex - The section index
   * @param signatureIndex - The signature index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the bound signature
   */
  async getBoundProductSignature(
    projectId: string,
    productName: string,
    partIndex: number,
    sectionIndex: number,
    signatureIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['bound-signature']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/bound-parts/${partIndex}/sections/${sectionIndex}/signatures/${signatureIndex}`,
      retryConfig
    )
  }

  /**
   * Deletes a bound product signature
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param sectionIndex - The section index
   * @param signatureIndex - The signature index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteBoundProductSignature(
    projectId: string,
    productName: string,
    partIndex: number,
    sectionIndex: number,
    signatureIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/projects/${projectId}/products/${productName}/bound-parts/${partIndex}/sections/${sectionIndex}/signatures/${signatureIndex}`,
      retryConfig
    )
  }

  /**
   * Retrieves a specific project product
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async getProjectProduct(
    projectId: string,
    productName: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}`,
      retryConfig
    )
  }

  /**
   * Deletes a project product
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteProjectProduct(
    projectId: string,
    productName: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/projects/${projectId}/products/${productName}`,
      retryConfig
    )
  }

  /**
   * Updates a project product
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param request - The edit product resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateProjectProduct(
    projectId: string,
    productName: string,
    request: components['schemas']['edit-product-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves flat product parts
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of flat parts
   */
  async getFlatProductParts(
    projectId: string,
    productName: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['flat-part'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/flat-parts`,
      retryConfig
    )
  }

  /**
   * Retrieves flats for a flat product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of flats
   */
  async getFlatProductFlats(
    projectId: string,
    productName: string,
    partIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['flat'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/flat-parts/${partIndex}/flats`,
      retryConfig
    )
  }

  /**
   * Retrieves a specific flat product flat
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param flatIndex - The flat index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the flat
   */
  async getFlatProductFlat(
    projectId: string,
    productName: string,
    partIndex: number,
    flatIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['flat']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/flat-parts/${partIndex}/flats/${flatIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a flat product flat
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param flatIndex - The flat index
   * @param request - The edit flat resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateFlatProductFlat(
    projectId: string,
    productName: string,
    partIndex: number,
    flatIndex: number,
    request: components['schemas']['edit-flat-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}/flat-parts/${partIndex}/flats/${flatIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a flat part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the flat part
   */
  async getFlatPart(
    projectId: string,
    productName: string,
    partIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['flat-part']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/flat-parts/${partIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a flat part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param request - The edit flat part resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateFlatPart(
    projectId: string,
    productName: string,
    partIndex: number,
    request: components['schemas']['edit-flat-part-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}/flat-parts/${partIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves folded product parts
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of folded parts
   */
  async getFoldedProductParts(
    projectId: string,
    productName: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['folded-part'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/folded-parts`,
      retryConfig
    )
  }

  /**
   * Retrieves a specific folded product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the folded part
   */
  async getFoldedProductPart(
    projectId: string,
    productName: string,
    partIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['folded-part']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/folded-parts/${partIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a folded product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param request - The edit folded part resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateFoldedProductPart(
    projectId: string,
    productName: string,
    partIndex: number,
    request: components['schemas']['edit-folded-part-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}/folded-parts/${partIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves signatures for a folded product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of folded signatures
   */
  async getFoldedProductPartSignatures(
    projectId: string,
    productName: string,
    partIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['folded-signature'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/folded-parts/${partIndex}/signatures`,
      retryConfig
    )
  }

  /**
   * Retrieves a specific folded product part signature
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param signatureIndex - The signature index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the folded signature
   */
  async getFoldedProductPartSignature(
    projectId: string,
    productName: string,
    partIndex: number,
    signatureIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['folded-signature']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/folded-parts/${partIndex}/signatures/${signatureIndex}`,
      retryConfig
    )
  }

  /**
   * Retrieves product parts
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of part objects
   */
  async getProductParts(
    projectId: string,
    productName: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['partObject'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/parts`,
      retryConfig
    )
  }

  /**
   * Retrieves components for a product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of component objects
   */
  async getProductPartComponents(
    projectId: string,
    productName: string,
    partIndex: number,
    retryConfig?: RetryConfig
  ): Promise<
    AxiosResponse<components['schemas']['componentObjectObjectObject'][]>
  > {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/components`,
      retryConfig
    )
  }

  /**
   * Retrieves a specific product part component
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param componentIndex - The component index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the component
   */
  async getProductPartComponent(
    projectId: string,
    productName: string,
    partIndex: number,
    componentIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['component']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/components/${componentIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a product part component
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param componentIndex - The component index
   * @param request - The edit component resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateProductPartComponent(
    projectId: string,
    productName: string,
    partIndex: number,
    componentIndex: number,
    request: components['schemas']['edit-component-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/components/${componentIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the part
   */
  async getProductPart(
    projectId: string,
    productName: string,
    partIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['part']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param request - The props resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateProductPart(
    projectId: string,
    productName: string,
    partIndex: number,
    request: components['schemas']['props-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves pages for a product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of pages
   */
  async getProductPartPages(
    projectId: string,
    productName: string,
    partIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['page'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages`,
      retryConfig
    )
  }

  /**
   * Creates pages for a product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param request - The create pages resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the create pages resource
   */
  async createProductPartPages(
    projectId: string,
    productName: string,
    partIndex: number,
    request: components['schemas']['CreatePagesResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['CreatePagesResource']>> {
    return this.client.request(
      'POST',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages`,
      request,
      retryConfig
    )
  }

  /**
   * Assigns pages to a product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param request - The path resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async assignProductPartPages(
    projectId: string,
    productName: string,
    partIndex: number,
    request: components['schemas']['path-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/assign`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a page color by index for a product part page
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param pageIndex - The page index
   * @param colorIndex - The color index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the page color
   */
  async getProductPartPageColorByIndex(
    projectId: string,
    productName: string,
    partIndex: number,
    pageIndex: number,
    colorIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['page-color']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/${pageIndex}/color/${colorIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a page color for a product part page
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param pageIndex - The page index
   * @param colorIndex - The color index
   * @param request - The page color
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateProductPartPageColor(
    projectId: string,
    productName: string,
    partIndex: number,
    pageIndex: number,
    colorIndex: number,
    request: components['schemas']['page-color'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/${pageIndex}/color/${colorIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves all colors for a product part page
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param pageIndex - The page index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of page colors
   */
  async getProductPartPageColors(
    projectId: string,
    productName: string,
    partIndex: number,
    pageIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['page-color'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/${pageIndex}/colors`,
      retryConfig
    )
  }

  /**
   * Retrieves a specific product part page
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param pageIndex - The page index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async getProductPartPage(
    projectId: string,
    productName: string,
    partIndex: number,
    pageIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/${pageIndex}`,
      retryConfig
    )
  }

  /**
   * Deletes a product part page
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param pageIndex - The page index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteProductPartPage(
    projectId: string,
    productName: string,
    partIndex: number,
    pageIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/${pageIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a product part page
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param pageIndex - The page index
   * @param request - The edit page resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateProductPartPage(
    projectId: string,
    productName: string,
    partIndex: number,
    pageIndex: number,
    request: components['schemas']['edit-page-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/${pageIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a file from a product part page
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param pageIndex - The page index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteProductPartPageFile(
    projectId: string,
    productName: string,
    partIndex: number,
    pageIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/${pageIndex}/file`,
      retryConfig
    )
  }

  /**
   * Updates a file for a product part page
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param pageIndex - The page index
   * @param request - The edit page file
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateProductPartPageFile(
    projectId: string,
    productName: string,
    partIndex: number,
    pageIndex: number,
    request: components['schemas']['edit-page-file'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/${pageIndex}/file`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves layers for a product part page
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param pageIndex - The page index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of page layers
   */
  async getProductPartPageLayers(
    projectId: string,
    productName: string,
    partIndex: number,
    pageIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['page-layer'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/${pageIndex}/layers`,
      retryConfig
    )
  }

  /**
   * Retrieves a specific layer for a product part page
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param pageIndex - The page index
   * @param layerIndex - The layer index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the page layer
   */
  async getProductPartPageLayer(
    projectId: string,
    productName: string,
    partIndex: number,
    pageIndex: number,
    layerIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['page-layer']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/${pageIndex}/layers/${layerIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a layer for a product part page
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param pageIndex - The page index
   * @param layerIndex - The layer index
   * @param request - The edit page layer
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateProductPartPageLayer(
    projectId: string,
    productName: string,
    partIndex: number,
    pageIndex: number,
    layerIndex: number,
    request: components['schemas']['edit-page-layer'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}/parts/${partIndex}/pages/${pageIndex}/layers/${layerIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves tiled product parts
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of tiled parts
   */
  async getTiledProductParts(
    projectId: string,
    productName: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['tiled-part'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/tiled-parts`,
      retryConfig
    )
  }

  /**
   * Retrieves a specific tiled product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the tiled part
   */
  async getTiledProductPart(
    projectId: string,
    productName: string,
    partIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['tiled-part']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/tiled-parts/${partIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a tiled product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param request - The edit tiled part resource
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateTiledProductPart(
    projectId: string,
    productName: string,
    partIndex: number,
    request: components['schemas']['edit-tiled-part-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}/tiled-parts/${partIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves tiles for a tiled product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of tile flats
   */
  getTiledProductPartTiles(
    projectId: string,
    productName: string,
    partIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['tile-flat'][]>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/tiled-parts/${partIndex}/tiles`,
      retryConfig
    )
  }

  /**
   * Retrieves a specific tile for a tiled product part
   * @param projectId - The project identifier
   * @param productName - The product name
   * @param partIndex - The part index
   * @param tileIndex - The tile index
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the tile flat
   */
  async getTiledProductPartTile(
    projectId: string,
    productName: string,
    partIndex: number,
    tileIndex: number,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['tile-flat']>> {
    return this.client.request(
      'GET',
      `/projects/${projectId}/products/${productName}/tiled-parts/${partIndex}/tiles/${tileIndex}`,
      retryConfig
    )
  }

  /**
   * Updates a specific tile in a tiled product part
   * @param projectId - The unique identifier of the project
   * @param productName - The name of the product
   * @param partIndex - The index of the part
   * @param tileIndex - The index of the tile to update
   * @param request - The tile edit resource data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateTiledProductPartTile(
    projectId: string,
    productName: string,
    partIndex: number,
    tileIndex: number,
    request: components['schemas']['edit-tile-resource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/products/${productName}/tiled-parts/${partIndex}/tiles/${tileIndex}`,
      request,
      retryConfig
    )
  }

  /**
   * Updates a repeat template in a project
   * @param projectId - The unique identifier of the project
   * @param templateName - The name of the template to update
   * @param request - The repeat template settings
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateRepeatTemplate(
    projectId: string,
    templateName: string,
    request: components['schemas']['repeat-template-settings'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PATCH',
      `/projects/${projectId}/repeat-templates/${templateName}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a repeat template from a project
   * @param projectId - The unique identifier of the project
   * @param templateName - The name of the template to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteRepeatTemplate(
    projectId: string,
    templateName: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/projects/${projectId}/repeat-templates/${templateName}`,
      retryConfig
    )
  }

  /**
   * Executes a script within a specific project context
   * @param projectId - The unique identifier of the project
   * @param request - The script context and parameters
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async runProjectScript(
    projectId: string,
    request: components['schemas']['RestScriptContext'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/projects/${projectId}/script`,
      request,
      retryConfig
    )
  }

  /**
   * Executes a script in global context
   * @param request - The script context and parameters
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async runScript(
    request: components['schemas']['RestScriptContext'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', '/script', request, retryConfig)
  }

  /**
   * Retrieves a specific die design from the library
   * @param dieDesignId - The unique identifier of the die design
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to an array of die design entities
   */
  async getDieDesign(
    dieDesignId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['DieDesignEntity'][]>> {
    return this.client.request(
      'GET',
      `/libraries/die-designs/${dieDesignId}`,
      retryConfig
    )
  }

  /**
   * Deletes a die design from the library
   * @param dieDesignId - The unique identifier of the die design to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteDieDesign(
    dieDesignId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/die-designs/${dieDesignId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all die designs from the library
   * @returns Promise resolving to all die designs
   */
  async getDieDesigns(): Promise<
    AxiosResponse<components['schemas']['ResponseEntity']>
  > {
    return this.client.request('GET', '/libraries/die-designs')
  }

  /**
   * Imports a die design into the library
   * @param request - The die design import data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async importDieDesign(
    request: components['schemas']['ImportDieDesignEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/die-designs/import',
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific mode from the library
   * @param modeId - The unique identifier of the mode
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the mode entity
   */
  async getMode(
    modeId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['mode']>> {
    return this.client.request('GET', `/libraries/modes/${modeId}`, retryConfig)
  }

  /**
   * Updates a mode in the library
   * @param modeId - The unique identifier of the mode to update
   * @param request - The updated mode data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateMode(
    modeId: string,
    request: components['schemas']['mode'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/modes/${modeId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a mode from the library
   * @param modeId - The unique identifier of the mode to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteMode(
    modeId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/modes/${modeId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all modes from the library
   * @returns Promise resolving to an array of mode entities
   */
  async getModes(): Promise<AxiosResponse<components['schemas']['mode'][]>> {
    return this.client.request('GET', '/libraries/modes')
  }

  /**
   * Adds a new mode to the library
   * @param request - The mode data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async addMode(
    request: components['schemas']['mode'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', '/libraries/modes', request, retryConfig)
  }

  /**
   * Retrieves a specific plate from the library
   * @param plateId - The unique identifier of the plate
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the plate entity
   */
  async getPlate(
    plateId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PlateEntity']>> {
    return this.client.request(
      'GET',
      `/libraries/plates/${plateId}`,
      retryConfig
    )
  }

  /**
   * Updates a plate in the library
   * @param plateId - The unique identifier of the plate to update
   * @param request - The updated plate data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updatePlate(
    plateId: string,
    request: components['schemas']['PlateEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/plates/${plateId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a plate from the library
   * @param plateId - The unique identifier of the plate to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deletePlate(
    plateId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/plates/${plateId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all plates from the library
   * @returns Promise resolving to an array of plate entities
   */
  async getPlates(): Promise<
    AxiosResponse<components['schemas']['PlateEntity'][]>
  > {
    return this.client.request('GET', '/libraries/plates')
  }

  /**
   * Adds a new plate to the library
   * @param request - The plate data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async addPlate(
    request: components['schemas']['PlateEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/plates',
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific press from the library
   * @param pressId - The unique identifier of the press
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the press entity
   */
  async getPress(
    pressId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PressEntity']>> {
    return this.client.request(
      'GET',
      `/libraries/presses/${pressId}`,
      retryConfig
    )
  }

  /**
   * Updates a press in the library
   * @param pressId - The unique identifier of the press to update
   * @param request - The updated press data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updatePress(
    pressId: string,
    request: components['schemas']['PressEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/presses/${pressId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a press from the library
   * @param pressId - The unique identifier of the press to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deletePress(
    pressId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/presses/${pressId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all presses from the library
   * @returns Promise resolving to an array of press entities
   */
  async getPresses(): Promise<
    AxiosResponse<components['schemas']['PressEntity'][]>
  > {
    return this.client.request('GET', '/libraries/presses')
  }

  /**
   * Adds a new press to the library
   * @param request - The press data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async addPress(
    request: components['schemas']['PressEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/presses',
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific process type from the library
   * @param processTypeId - The unique identifier of the process type
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the process type entity
   */
  async getProcessType(
    processTypeId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['process-type']>> {
    return this.client.request(
      'GET',
      `/libraries/process-types/${processTypeId}`,
      retryConfig
    )
  }

  /**
   * Updates a process type in the library
   * @param processTypeId - The unique identifier of the process type to update
   * @param request - The updated process type data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateProcessType(
    processTypeId: string,
    request: components['schemas']['process-type'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/process-types/${processTypeId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a process type from the library
   * @param processTypeId - The unique identifier of the process type to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteProcessType(
    processTypeId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/process-types/${processTypeId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all process types from the library
   * @returns Promise resolving to an array of process type entities
   */
  async getProcessTypes(): Promise<
    AxiosResponse<components['schemas']['process-type'][]>
  > {
    return this.client.request('GET', '/libraries/process-types')
  }

  /**
   * Adds a new process type to the library
   * @param request - The process type data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async addProcessType(
    request: components['schemas']['process-type'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/process-types',
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific process from the library
   * @param processId - The unique identifier of the process
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the process entity
   */
  async getProcess(
    processId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['process']>> {
    return this.client.request(
      'GET',
      `/libraries/processes/${processId}`,
      retryConfig
    )
  }

  /**
   * Updates a process in the library
   * @param processId - The unique identifier of the process to update
   * @param request - The updated process data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateProcess(
    processId: string,
    request: components['schemas']['process'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/processes/${processId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a process from the library
   * @param processId - The unique identifier of the process to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteProcess(
    processId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/processes/${processId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all processes from the library
   * @returns Promise resolving to an array of process entities
   */
  async getProcesses(): Promise<
    AxiosResponse<components['schemas']['process'][]>
  > {
    return this.client.request('GET', '/libraries/processes')
  }

  /**
   * Adds a new process to the library
   * @param request - The process data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async addProcess(
    request: components['schemas']['process'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/processes',
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific stock type from the library
   * @param stockTypeId - The unique identifier of the stock type
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the stock type entity
   */
  async getStockType(
    stockTypeId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['stock-type']>> {
    return this.client.request(
      'GET',
      `/libraries/stock-types/${stockTypeId}`,
      retryConfig
    )
  }

  /**
   * Updates a stock type in the library
   * @param stockTypeId - The unique identifier of the stock type to update
   * @param request - The updated stock type data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateStockType(
    stockTypeId: string,
    request: components['schemas']['stock-type'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/stock-types/${stockTypeId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a stock type from the library
   * @param stockTypeId - The unique identifier of the stock type to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteStockType(
    stockTypeId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/stock-types/${stockTypeId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all stock types from the library
   * @returns Promise resolving to an array of stock type entities
   */
  async getStockTypes(): Promise<
    AxiosResponse<components['schemas']['stock-type'][]>
  > {
    return this.client.request('GET', '/libraries/stock-types')
  }

  /**
   * Adds a new stock type to the library
   * @param request - The stock type data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async addStockType(
    request: components['schemas']['stock-type'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/stock-types',
      request,
      retryConfig
    )
  }

  /**
   * @deprecated Use getStockV2 instead
   */
  async getStock(
    stockId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['stock']>> {
    return this.client.request(
      'GET',
      `/libraries/stocks/${stockId}`,
      retryConfig
    )
  }

  /**
   * Retrieves a specific stock from the library (v2 API)
   * @param stockId - The unique identifier of the stock
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the stock entity
   */
  async getStockV2(
    stockId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['stock']>> {
    return this.client.request(
      'GET',
      `/libraries/v2/stocks/${stockId}`,
      retryConfig
    )
  }

  /**
   * Updates a stock in the library
   * @param stockId - The unique identifier of the stock to update
   * @param request - The updated stock data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateStock(
    stockId: string,
    request: components['schemas']['stock'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/stocks/${stockId}`,
      request,
      retryConfig
    )
  }
  /**
   * Deletes a stock from the library
   * @param stockId - The unique identifier of the stock to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteStock(
    stockId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/stocks/${stockId}`,
      retryConfig
    )
  }

  /**
   *   * @deprecated Use getStocksV2 instead
   */
  async getStocks(): Promise<
    AxiosResponse<components['schemas']['StockEntity'][]>
  > {
    return this.client.request('GET', '/libraries/stocks')
  }

  /**
   * Retrieves all stocks from the library (v2 API)
   * @returns Promise resolving to an array of stock entities
   */
  async getStocksV2(): Promise<
    AxiosResponse<components['schemas']['stock'][]>
  > {
    return this.client.request('GET', '/libraries/v2/stocks')
  }

  /**
   * @deprecated Use addStockV2 instead
   */
  async addStock(
    request: components['schemas']['StockEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/stocks',
      request,
      retryConfig
    )
  }

  /**
   * Adds a new stock to the library (v2 API)
   * @param request - The stock data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async addStockV2(
    request: components['schemas']['stock'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/v2/stocks',
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific template from the library
   * @param templateId - The unique identifier of the template
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the template entity
   */
  async getTemplate(
    templateId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['TemplateEntity']>> {
    return this.client.request(
      'GET',
      `/libraries/templates/${templateId}`,
      retryConfig
    )
  }

  /**
   * Deletes a template from the library
   * @param templateId - The unique identifier of the template to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async deleteTemplate(
    templateId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/templates/${templateId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all templates from the library
   * @returns Promise resolving to an array of template entities
   */
  async getTemplates(): Promise<
    AxiosResponse<components['schemas']['TemplateEntity'][]>
  > {
    return this.client.request('GET', '/libraries/templates')
  }

  /**
   * Adds a new template to the library
   * @param request - The template import data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async addTemplate(
    request: components['schemas']['ImportTemplateEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/templates',
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific thing from the library
   * @param thingId - The unique identifier of the thing
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the thing entity
   */
  async getThing(
    thingId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['thing']>> {
    return this.client.request(
      'GET',
      `/libraries/things/${thingId}`,
      retryConfig
    )
  }

  /**
   * Updates a thing in the library
   * @param thingId - The unique identifier of the thing to update
   * @param request - The updated thing data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to the response entity
   */
  async updateThing(
    thingId: string,
    request: components['schemas']['thing'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/things/${thingId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a thing by ID
   * @param thingId - The ID of the thing to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async deleteThing(
    thingId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/things/${thingId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all things
   * @returns Promise resolving to array of things
   */
  async getThings(): Promise<AxiosResponse<components['schemas']['thing'][]>> {
    return this.client.request('GET', '/libraries/things')
  }

  /**
   * Adds a new thing
   * @param request - The thing data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async addThing(
    request: components['schemas']['thing'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/things',
      request,
      retryConfig
    )
  }

  /**
   * @deprecated Use getFoldingPatternsV2 instead
   */
  async getFoldingPatterns(): Promise<
    AxiosResponse<components['schemas']['FoldingPatternEntity'][]>
  > {
    return this.client.request('GET', '/libraries/folding')
  }

  /**
   * Retrieves all folding patterns (v2)
   * @returns Promise resolving to array of folding patterns
   */
  async getFoldingPatternsV2(): Promise<
    AxiosResponse<components['schemas']['folding-pattern'][]>
  > {
    return this.client.request('GET', '/libraries/v2/folding')
  }

  /**
   * Retrieves a specific folding pattern by ID
   * @param foldingPatternId - The ID of the folding pattern
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to folding pattern
   */
  async getFoldingPattern(
    foldingPatternId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['folding-pattern']>> {
    return this.client.request(
      'GET',
      `/libraries/v2/folding/${foldingPatternId}`,
      retryConfig
    )
  }

  /**
   * Updates a folding pattern
   * @param foldingPatternId - The ID of the folding pattern to update
   * @param request - The updated folding pattern data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async updateFoldingPattern(
    foldingPatternId: string,
    request: components['schemas']['folding-pattern'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/v2/folding/${foldingPatternId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a folding pattern
   * @param foldingPatternId - The ID of the folding pattern to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async deleteFoldingPattern(
    foldingPatternId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/v2/folding/${foldingPatternId}`,
      retryConfig
    )
  }

  /**
   * Adds a new folding pattern
   * @param request - The folding pattern data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async addFoldingPattern(
    request: components['schemas']['folding-pattern'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/v2/folding',
      request,
      retryConfig
    )
  }

  /**
   * Retrieves all mark sets
   * @returns Promise resolving to array of mark sets
   */
  async getMarkSets(): Promise<
    AxiosResponse<components['schemas']['MarkSetEntity'][]>
  > {
    return this.client.request('GET', '/libraries/markssets')
  }

  /**
   * Retrieves all marks
   * @returns Promise resolving to array of marks
   */
  async getMarks(): Promise<
    AxiosResponse<components['schemas']['MarkEntity'][]>
  > {
    return this.client.request('GET', '/libraries/marks')
  }

  /**
   * Retrieves a specific mark by ID
   * @param markId - The ID of the mark
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to mark asset
   */
  async getMark(
    markId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['MarkAsset']>> {
    return this.client.request('GET', `/libraries/marks/${markId}`, retryConfig)
  }

  /**
   * Updates a mark
   * @param markId - The ID of the mark to update
   * @param request - The updated mark data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async updateMark(
    markId: string,
    request: components['schemas']['mark'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/v2/marks/${markId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a mark
   * @param markId - The ID of the mark to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async deleteMark(
    markId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/v2/marks/${markId}`,
      retryConfig
    )
  }

  /**
   * Adds a new mark
   * @param request - The mark data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async addMark(
    request: components['schemas']['mark'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/v2/marks',
      request,
      retryConfig
    )
  }

  /**
   * Retrieves all marks (v2)
   * @returns Promise resolving to response entity
   */
  async getMarksV2(): Promise<
    AxiosResponse<components['schemas']['ResponseEntity']>
  > {
    return this.client.request('GET', '/libraries/v2/marks')
  }

  /**
   * Retrieves a specific script by ID
   * @param scriptId - The ID of the script
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to script asset
   */
  async getScript(
    scriptId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ScriptAsset']>> {
    return this.client.request(
      'GET',
      `/libraries/scripts/${scriptId}`,
      retryConfig
    )
  }

  /**
   * Updates a script
   * @param scriptId - The ID of the script to update
   * @param request - The updated script data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async updateScript(
    scriptId: string,
    request: components['schemas']['ScriptAsset'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/scripts/${scriptId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a script
   * @param scriptId - The ID of the script to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async deleteScript(
    scriptId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/scripts/${scriptId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all scripts
   * @returns Promise resolving to array of script assets
   */
  async getScripts(): Promise<
    AxiosResponse<components['schemas']['ScriptAsset'][]>
  > {
    return this.client.request('GET', '/libraries/scripts')
  }

  /**
   * Adds a new script
   * @param request - The script data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async addScript(
    request: components['schemas']['ScriptAsset'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/scripts',
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific stock grade
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to grade entity
   */
  async getStockGrade(
    stockId: string,
    stockGradeId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['GradeEntity']>> {
    return this.client.request(
      'GET',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}`,
      retryConfig
    )
  }

  /**
   * Updates a stock grade
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade to update
   * @param request - The updated grade data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async updateStockGrade(
    stockId: string,
    stockGradeId: string,
    request: components['schemas']['GradeEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a stock grade
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async deleteStockGrade(
    stockId: string,
    stockGradeId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all grades for a stock
   * @param stockId - The ID of the stock
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to array of grade entities
   */
  async getStockGrades(
    stockId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['GradeEntity'][]>> {
    return this.client.request(
      'GET',
      `/libraries/stocks/${stockId}/grades`,
      retryConfig
    )
  }

  /**
   * Adds a new grade to a stock
   * @param stockId - The ID of the stock
   * @param request - The grade data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async addStockGrade(
    stockId: string,
    request: components['schemas']['GradeEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/libraries/stocks/${stockId}/grades`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific stock grade roll
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade
   * @param stockGradeRollId - The ID of the stock grade roll
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to roll entity
   */
  async getStockGradeRoll(
    stockId: string,
    stockGradeId: string,
    stockGradeRollId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['RollEntity']>> {
    return this.client.request(
      'GET',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}/rolls/${stockGradeRollId}`,
      retryConfig
    )
  }

  /**
   * Updates a stock grade roll
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade
   * @param stockGradeRollId - The ID of the stock grade roll to update
   * @param request - The updated roll data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async updateStockGradeRoll(
    stockId: string,
    stockGradeId: string,
    stockGradeRollId: string,
    request: components['schemas']['GradeEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}/rolls/${stockGradeRollId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a stock grade roll
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade
   * @param stockGradeRollId - The ID of the stock grade roll to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async deleteStockGradeRoll(
    stockId: string,
    stockGradeId: string,
    stockGradeRollId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}/rolls/${stockGradeRollId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all rolls for a stock grade
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to array of roll entities
   */
  async getStockGradeRolls(
    stockId: string,
    stockGradeId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['RollEntity'][]>> {
    return this.client.request(
      'GET',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}/rolls`,
      retryConfig
    )
  }

  /**
   * Adds a new roll to a stock grade
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade
   * @param request - The roll data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async addStockGradeRoll(
    stockId: string,
    stockGradeId: string,
    request: components['schemas']['RollEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}/rolls`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific stock grade sheet
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade
   * @param stockGradeSheetId - The ID of the stock grade sheet
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to sheet entity
   */
  async getStockGradeSheet(
    stockId: string,
    stockGradeId: string,
    stockGradeSheetId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['SheetEntity']>> {
    return this.client.request(
      'GET',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}/sheets/${stockGradeSheetId}`,
      retryConfig
    )
  }

  /**
   * Updates a stock grade sheet
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade
   * @param stockGradeSheetId - The ID of the stock grade sheet to update
   * @param request - The updated sheet data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async updateStockGradeSheet(
    stockId: string,
    stockGradeId: string,
    stockGradeSheetId: string,
    request: components['schemas']['SheetEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}/sheets/${stockGradeSheetId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a stock grade sheet
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade
   * @param stockGradeSheetId - The ID of the stock grade sheet to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async deleteStockGradeSheet(
    stockId: string,
    stockGradeId: string,
    stockGradeSheetId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}/sheets/${stockGradeSheetId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all sheets for a stock grade
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to array of sheet entities
   */
  async getStockGradeSheets(
    stockId: string,
    stockGradeId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['SheetEntity'][]>> {
    return this.client.request(
      'GET',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}/sheets`,
      retryConfig
    )
  }

  /**
   * Adds a new sheet to a stock grade
   * @param stockId - The ID of the stock
   * @param stockGradeId - The ID of the stock grade
   * @param request - The sheet data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async addStockGradeSheet(
    stockId: string,
    stockGradeId: string,
    request: components['schemas']['SheetEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/libraries/stocks/${stockId}/grades/${stockGradeId}/sheets`,
      request,
      retryConfig
    )
  }

  /**
   * Retrieves a specific tiling preset by ID
   * @param tilingPresetId - The ID of the tiling preset
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to tiling preset
   */
  async getTilingPreset(
    tilingPresetId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['tiling']>> {
    return this.client.request(
      'GET',
      `/libraries/tiling/${tilingPresetId}`,
      retryConfig
    )
  }

  /**
   * Updates a tiling preset
   * @param tilingPresetId - The ID of the tiling preset to update
   * @param request - The updated tiling preset data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async updateTilingPreset(
    tilingPresetId: string,
    request: components['schemas']['tiling'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/libraries/tiling/${tilingPresetId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes a tiling preset
   * @param tilingPresetId - The ID of the tiling preset to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async deleteTilingPreset(
    tilingPresetId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/libraries/tiling/${tilingPresetId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all tiling presets
   * @returns Promise resolving to array of tiling presets
   */
  async getTilingPresets(): Promise<
    AxiosResponse<components['schemas']['tiling'][]>
  > {
    return this.client.request('GET', '/libraries/tiling')
  }

  /**
   * Adds a new tiling preset
   * @param request - The tiling preset data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async addTilingPreset(
    request: components['schemas']['tiling'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/libraries/tiling',
      request,
      retryConfig
    )
  }

  /**
   * Retrieves ARD die import presets
   * @returns Promise resolving to array of preset entities
   */
  async getArdDieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/ard')
  }

  /**
   * Retrieves CFF2 die import presets
   * @returns Promise resolving to array of preset entities
   */
  async getCff2DieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/cff2')
  }

  /**
   * Retrieves DDES2 die import presets
   * @returns Promise resolving to array of preset entities
   */
  async getDdes2DieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/ddes2')
  }

  /**
   * Retrieves DDES3 die import presets
   * @returns Promise resolving to array of preset entities
   */
  async getDdes3DieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/ddes3')
  }

  /**
   * Retrieves DXF die import presets
   * @returns Promise resolving to array of preset entities
   */
  async getDxfDieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/dxf')
  }

  /**
   * Retrieves MFG die import presets
   * @returns Promise resolving to array of preset entities
   */
  async getMFGDieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/mfg')
  }

  /**
   * Retrieves PDF die import presets
   * @returns Promise resolving to array of preset entities
   */
  async getPdfDieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/pdf')
  }

  /**
   * Retrieves a specific imposition AI profile by ID
   * @param impositionAIProfileId - The ID of the imposition AI profile
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to imposition AI profile entity
   */
  async getImpositionAiProfile(
    impositionAIProfileId: string,
    retryConfig?: RetryConfig
  ): Promise<
    AxiosResponse<components['schemas']['ImpositionAiProfileEntity']>
  > {
    return this.client.request(
      'GET',
      `/presets/imposition-ai/${impositionAIProfileId}`,
      retryConfig
    )
  }

  /**
   * Updates an imposition AI profile
   * @param impositionAIProfileId - The ID of the imposition AI profile to update
   * @param request - The updated imposition AI profile data
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async updateImpositionAiProfile(
    impositionAIProfileId: string,
    request: components['schemas']['ImpositionAiProfileEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'PUT',
      `/presets/imposition-ai/${impositionAIProfileId}`,
      request,
      retryConfig
    )
  }

  /**
   * Deletes an imposition AI profile
   * @param impositionAIProfileId - The ID of the imposition AI profile to delete
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async deleteImpositionAiProfile(
    impositionAIProfileId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'DELETE',
      `/presets/imposition-ai/${impositionAIProfileId}`,
      retryConfig
    )
  }

  /**
   * Retrieves all imposition AI profiles (v2)
   * @returns Promise resolving to array of imposition AI profile entities
   */
  async getImpositionAiProfilesV2(): Promise<
    AxiosResponse<components['schemas']['ImpositionAiProfileEntity'][]>
  > {
    return this.client.request('GET', '/presets/imposition-ai')
  }

  /**
   * Adds a new imposition AI profile
   * @param request - The imposition AI profile data to add
   * @param retryConfig - Optional retry configuration
   * @returns Promise resolving to response entity
   */
  async addImpositionAiProfile(
    request: components['schemas']['ImpositionAiProfileEntity'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      '/presets/imposition-ai',
      request,
      retryConfig
    )
  }

  /**
   * @deprecated Use getImpositionAiProfilesV2 instead
   */
  /**
   * Retrieves imposition AI profiles
   * @returns Promise resolving to preset entity
   */
  async getImpositionAiProfiles(): Promise<
    AxiosResponse<components['schemas']['PresetEntity']>
  > {
    return this.client.request('GET', '/presets/imposition-ai/profiles')
  }

  /**
   * Retrieves dynamic ink mapping presets
   * @returns Promise resolving to array of preset entities
   */
  async getDynamicInkMappingPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/marks/dynamic-ink-mappings')
  }

  /**
   * Retrieves dynamic keyword mappings
   * @returns Promise resolving to response entity
   */
  async getDynamicKeywordMappings(): Promise<
    AxiosResponse<components['schemas']['ResponseEntity']>
  > {
    return this.client.request('GET', '/presets/marks/dynamic-keyword-mappings')
  }

  /**
   * Retrieves cover sheet export presets
   * @returns Promise resolving to array of preset entities
   */
  async getCoverSheetExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/cover-sheet')
  }

  /**
   * Retrieves CSV report export presets
   * @returns Promise resolving to array of preset entities
   */
  async getCsvReportExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/report/csv')
  }

  /**
   * Retrieves CFF2 die export presets
   * @returns Promise resolving to array of preset entities
   */
  async getCff2DieExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/die/cff2')
  }

  /**
   * Retrieves DXF die export presets
   * @returns Promise resolving to array of preset entities
   */
  async getDxfDieExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/die/dxf')
  }

  /**
   * Retrieves PDF die export presets
   * @returns Promise resolving to array of preset entities
   */
  async getPdfDieExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/die/pdf')
  }

  /**
   * Retrieves ZCC die export presets
   * @returns Promise resolving to array of preset entities
   */
  async getZccDieExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/die/zcc')
  }

  /**
   * Retrieves HP JDF export presets
   * @returns Promise resolving to array of preset entities
   */
  async getHpJdfExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/hp-jdf')
  }

  /**
   * Retrieves JDF export presets
   * @returns Promise resolving to array of preset entities
   */
  async getJdfExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/jdf')
  }

  /**
   * Retrieves JDF cutting export presets
   * @returns Promise resolving to array of preset entities
   */
  async getJdfCuttingExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/jdf-cutting')
  }

  /**
   * Retrieves JSON report export presets
   * @returns Promise resolving to array of preset entities
   */
  async getJsonReportExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/report/json')
  }

  /**
   * Retrieves JDF Kongsberg export presets
   * @returns Promise resolving to array of preset entities
   */
  async getJdfKongsbergExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/jdf-kongsberg')
  }

  /**
   * Retrieves imposed PDF export presets
   * @returns Promise resolving to array of preset entities
   */
  async getImposedPDFExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/pdf')
  }

  /**
   * Retrieves PDF report export presets
   * @returns Promise resolving to array of preset entities
   */
  async getPdfReportExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/report/pdf')
  }

  /**
   * Retrieves vector separation export presets
   * @returns Promise resolving to array of preset entities
   */
  async getVectorSeparationExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/pdf-vector')
  }

  /**
   * Retrieves XML report export presets
   * @returns Promise resolving to array of preset entities
   */
  async getXmlReportExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/report/xml')
  }

  /**
   * @deprecated Use getImpositionAiProfilesV2 instead
   */
  /**
   * Retrieves imposition AI profile presets
   * @returns Promise resolving to array of response entities
   */
  async getImpositionAiProfilePresets(): Promise<
    AxiosResponse<components['schemas']['ResponseEntity'][]>
  > {
    return this.client.request('GET', '/presets/imposition-ai/profiles')
  }

  /**
   * Retrieves product CSV import presets
   * @returns Promise resolving to array of preset entities
   */
  async getProductCsvImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/product/csv')
  }

  /**
   * Retrieves step and repeat presets
   * @returns Promise resolving to array of preset entities
   */
  async getStepAndRepeatPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/tools/step-and-repeat')
  }

  /**
   * Retrieves stock CSV import presets
   * @returns Promise resolving to array of preset entities
   */
  async getStockCsvImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/stock-csv')
  }

  /**
   * Retrieves product tiling presets
   * @returns Promise resolving to array of preset entities
   */
  async getProductTilingPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/products/tiling')
  }
}
