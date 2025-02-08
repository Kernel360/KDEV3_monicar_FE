import * as XLSX from 'xlsx'

import { API_ENDPOINTS } from '@/constants/api'
import { httpClient } from '@/lib/apis/client'
import { ListItemModel } from '@/types/log'

import { EXCEL_FILE_NAME, EXCEL_SHEET_NAME } from '../constants'

interface ExcelData {
    차량번호: string
    차종: string
    운행일수: string
    총운행거리: string
}

const getExcelData = (data: ListItemModel[]) => {
    return data.map((item) => ({
        차량번호: item.vehicleNumber,
        차종: item.vehicleModel,
        운행일수: `${item.drivingDays.toLocaleString('ko-KR')}`,
        총운행거리: `${item.totalDistance.toLocaleString('ko-KR')}km`,
    }))
}

const saveExcel = (excelData: ExcelData[]) => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(excelData)
    XLSX.utils.book_append_sheet(wb, ws, EXCEL_SHEET_NAME)
    XLSX.writeFile(wb, EXCEL_FILE_NAME)
}

export const downloadExcel = async (keyword: string) => {
    try {
        const response = await httpClient.get(API_ENDPOINTS.LOG, {
            params: {
                page: 0,
                size: 1000,
                sort: 'CREATED_AT_DESC',
                keyword,
            },
        })
        const allData = response.data.result.content
        const excelData = getExcelData(allData)
        saveExcel(excelData)
    } catch (error) {
        console.error('Excel 다운로드 실패', error)
        throw error
    }
}
