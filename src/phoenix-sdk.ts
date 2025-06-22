import { PhoenixClient, RetryConfig } from './client'
import { AxiosResponse } from 'axios'
import { components } from './types/phoenix-types'

export class PhoenixAPI {
  constructor(private client: PhoenixClient) {}

  async getJobs(): Promise<
    AxiosResponse<components['schemas']['PhoenixProject'][]>
  > {
    return this.client.request('GET', `/jobs/`)
  }

  async createJob(
    request: components['schemas']['CreateJobResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', '/jobs', request, retryConfig)
  }

  async openJobWithFile(
    file: File,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    const formData = new FormData()
    formData.append('file', file)

    return this.client.request('POST', '/jobs/open', formData, retryConfig)
  }

  async getJob(
    projectId: string
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('GET', `/jobs/${projectId}`)
  }

  async deleteJob(
    projectId: string
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('DELETE', `/jobs/${projectId}`)
  }

  async updateJob(
    projectId: string,
    request: components['schemas']['EditProjectResource']
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('PATCH', `/jobs/${projectId}`, request)
  }

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

  async exportCff2(
    projectId: string,
    request: components['schemas']['ExportCff2LayoutResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request(
      'POST',
      `/jobs/${projectId}/export/die/Cff2`,
      request,
      retryConfig
    )
  }

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

  async getLayouts(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PhoenixLayoutEntity'][]>> {
    return this.client.request('GET', `/jobs/${projectId}/layouts`, retryConfig)
  }

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
   * @deprecated
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

  async getOutputFiles(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['JobFilesEntity'][]>> {
    return this.client.request('GET', `/jobs/${projectId}/output`, retryConfig)
  }

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

  async saveProject(
    projectId: string,
    request?: components['schemas']['SaveJobResource']
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', `/jobs/${projectId}/save`, request)
  }

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
   * @deprecated Use `runProjectScript` instead.
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

  async snapProjectArtwork(
    projectId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', `/jobs/${projectId}/snap`, retryConfig)
  }

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

  async getProjects(
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['PhoenixProject'][]>> {
    return this.client.request('GET', '/projects', retryConfig)
  }

  async createProject(
    request: components['schemas']['CreateJobResource'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', '/projects', request, retryConfig)
  }

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

  async runScript(
    request: components['schemas']['RestScriptContext'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', '/script', request, retryConfig)
  }

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

  async getDieDesigns(): Promise<
    AxiosResponse<components['schemas']['ResponseEntity']>
  > {
    return this.client.request('GET', '/libraries/die-designs')
  }

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

  async getMode(
    modeId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['mode']>> {
    return this.client.request('GET', `/libraries/modes/${modeId}`, retryConfig)
  }

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

  async getModes(): Promise<AxiosResponse<components['schemas']['mode'][]>> {
    return this.client.request('GET', '/libraries/modes')
  }

  async addMode(
    request: components['schemas']['mode'],
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['ResponseEntity']>> {
    return this.client.request('POST', '/libraries/modes', request, retryConfig)
  }

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

  async getPlates(): Promise<
    AxiosResponse<components['schemas']['PlateEntity'][]>
  > {
    return this.client.request('GET', '/libraries/plates')
  }

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

  async getPresses(): Promise<
    AxiosResponse<components['schemas']['PressEntity'][]>
  > {
    return this.client.request('GET', '/libraries/presses')
  }

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

  async getProcessTypes(): Promise<
    AxiosResponse<components['schemas']['process-type'][]>
  > {
    return this.client.request('GET', '/libraries/process-types')
  }

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

  async getProcesses(): Promise<
    AxiosResponse<components['schemas']['process'][]>
  > {
    return this.client.request('GET', '/libraries/processes')
  }

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

  async getStockTypes(): Promise<
    AxiosResponse<components['schemas']['stock-type'][]>
  > {
    return this.client.request('GET', '/libraries/stock-types')
  }

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

  async getTemplates(): Promise<
    AxiosResponse<components['schemas']['TemplateEntity'][]>
  > {
    return this.client.request('GET', '/libraries/templates')
  }

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

  async getThings(): Promise<AxiosResponse<components['schemas']['thing'][]>> {
    return this.client.request('GET', '/libraries/things')
  }

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

  async getFoldingPatternsV2(): Promise<
    AxiosResponse<components['schemas']['folding-pattern'][]>
  > {
    return this.client.request('GET', '/libraries/v2/folding')
  }

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

  async getMarkSets(): Promise<
    AxiosResponse<components['schemas']['MarkSetEntity'][]>
  > {
    return this.client.request('GET', '/libraries/markssets')
  }

  async getMarks(): Promise<
    AxiosResponse<components['schemas']['MarkEntity'][]>
  > {
    return this.client.request('GET', '/libraries/marks')
  }

  async getMark(
    markId: string,
    retryConfig?: RetryConfig
  ): Promise<AxiosResponse<components['schemas']['MarkAsset']>> {
    return this.client.request('GET', `/libraries/marks/${markId}`, retryConfig)
  }

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

  async getMarksV2(): Promise<
    AxiosResponse<components['schemas']['ResponseEntity']>
  > {
    return this.client.request('GET', '/libraries/v2/marks')
  }

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

  async getScripts(): Promise<
    AxiosResponse<components['schemas']['ScriptAsset'][]>
  > {
    return this.client.request('GET', '/libraries/scripts')
  }

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

  async getTilingPresets(): Promise<
    AxiosResponse<components['schemas']['tiling'][]>
  > {
    return this.client.request('GET', '/libraries/tiling')
  }

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

  async getArdDieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/ard')
  }

  async getCff2DieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/cff2')
  }

  async getDdes2DieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/ddes2')
  }

  async getDdes3DieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/ddes3')
  }

  async getDxfDieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/dxf')
  }

  async getMFGDieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/mfg')
  }

  async getPdfDieImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/die/pdf')
  }

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

  async getImpositionAiProfilesV2(): Promise<
    AxiosResponse<components['schemas']['ImpositionAiProfileEntity'][]>
  > {
    return this.client.request('GET', '/presets/imposition-ai')
  }

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
  async getImpositionAiProfiles(): Promise<
    AxiosResponse<components['schemas']['PresetEntity']>
  > {
    return this.client.request('GET', '/presets/imposition-ai/profiles')
  }

  async getDynamicInkMappingPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/marks/dynamic-ink-mappings')
  }

  async getDynamicKeywordMappings(): Promise<
    AxiosResponse<components['schemas']['ResponseEntity']>
  > {
    return this.client.request('GET', '/presets/marks/dynamic-keyword-mappings')
  }

  async getCoverSheetExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/cover-sheet')
  }

  async getCsvReportExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/report/csv')
  }

  async getCff2DieExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/die/cff2')
  }

  async getDxfDieExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/die/dxf')
  }

  async getPdfDieExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/die/pdf')
  }

  async getZccDieExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/die/zcc')
  }

  async getHpJdfExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/hp-jdf')
  }

  async getJdfExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/jdf')
  }

  async getJdfCuttingExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/jdf-cutting')
  }

  async getJsonReportExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/report/json')
  }

  async getJdfKongsbergExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/jdf-kongsberg')
  }

  async getImposedPDFExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/pdf')
  }

  async getPdfReportExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/report/pdf')
  }

  async getVectorSeparationExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/pdf-vector')
  }

  async getXmlReportExportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/export/report/xml')
  }

  /**
   * @deprecated Use getImpositionAiProfilesV2 instead
   */
  async getImpositionAiProfilePresets(): Promise<
    AxiosResponse<components['schemas']['ResponseEntity'][]>
  > {
    return this.client.request('GET', '/presets/imposition-ai/profiles')
  }

  async getProductCsvImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/product/csv')
  }

  async getStepAndRepeatPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/tools/step-and-repeat')
  }

  async getStockCsvImportPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/import/stock-csv')
  }

  async getProductTilingPresets(): Promise<
    AxiosResponse<components['schemas']['PresetEntity'][]>
  > {
    return this.client.request('GET', '/presets/products/tiling')
  }
}
