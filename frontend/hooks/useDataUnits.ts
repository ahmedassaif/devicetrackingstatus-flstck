import { useCallback, useEffect, useState } from "react"
import { DataUnitService } from "@/api/services/spesific-services/dataUnit.service"
import { DataUnitDto } from "@/api/services/types/dataUnit.types"
import { ListResponse, ResponseResult } from "@/api/services/types/commonResponses.types"

export function useDataUnits() {
  const [dataUnits, setDataUnits] = useState<DataUnitDto[]>([])

  const handleDataUnitsResponse = useCallback(
    (response: ResponseResult<ListResponse<DataUnitDto>>) => {
    //   console.log("Response received:", response) // Log the entire response

      if (response.error) {
        // console.error("Error in response:", response.error) // Log the error
        setDataUnits([]) // Clear DataUnits on error
        return
      }

      if (Array.isArray(response.result)) {
        // console.log("Fetched Data Units:", response.result) // Log fetched data items
        setDataUnits(response.result) // Update DataUnits with fetched data
      } else {
        // console.error("Unexpected response structure.") // Log unexpected response structure
        setDataUnits([]) // Clear DataUnits on unexpected response
      }
    },
    [setDataUnits]
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataUnitService = new DataUnitService()
        const response = await dataUnitService.getLookupAllDataUnits()

        // console.log("API call response:", response) // Log the initial API call response
        if (response.result) {
          handleDataUnitsResponse(response)
        } else {
          console.error("Error: No result in response")
        }
      } catch (error) {
        console.error("Error fetching data units:", error)
      }
    }

    fetchData()
  }, [handleDataUnitsResponse])

  return dataUnits
}
