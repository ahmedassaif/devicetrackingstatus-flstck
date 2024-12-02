<?php

namespace App\Classes;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

/**
 * @OA\Schema(
 *     schema="ApiResponse",
 *     type="object",
 *     @OA\Property(property="success", type="boolean", description="Indicates if the request was successful"),
 *     @OA\Property(
 *         property="data",
 *         type="array",
 *         description="Contains the response data",
 *         @OA\Items(anyOf={
 *             @OA\Schema(ref="#/components/schemas/Audit"),
 *             @OA\Schema(type="string", description="Other possible data types")
 *         })
 *     ),
 *     @OA\Property(property="message", type="string", description="Response message")
 * )
 */
class ApiResponseClass
{
    public static function rollback($e, $message ="Something went wrong! Process not completed"){
        DB::rollBack();
        self::throw($e, $message);
    }

    public static function throw($e, $message ="Something went wrong! Process not completed"){
        Log::info($e);
        throw new HttpResponseException(response()->json(["message"=> $message], 500));
    }

    public static function sendResponse($result , $message ,$code=200){
        $response=[
            'success' => true,
            'data'    => $result
        ];
        if(!empty($message)){
            $response['message'] =$message;
        }
        return response()->json($response, $code);
    }

}