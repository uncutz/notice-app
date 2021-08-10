<?php declare(strict_types=1);

use Fig\Http\Message\StatusCodeInterface;
use uncutz\NoticeApp\HttpRequest;
use uncutz\NoticeApp\HttpResponder;
use uncutz\NoticeApp\HttpResponse;

require_once __DIR__ . '/../../vendor/autoload.php';

$request = new HttpRequest();


if ( $request->getMethod() === 'GET')
{
    // notices.json lesen
    // eine Response erzeugen
    // das json an den Client korrekt ausliefern
}

if ( $request->getMethod() === 'POST' )
{
    try {
        $payload = json_decode($request->getBody(), true, 512, JSON_THROW_ON_ERROR);

        file_put_contents(__DIR__ . '/../../data/notices.json', json_encode($payload));

        $response = new HttpResponse(
            StatusCodeInterface::STATUS_OK,
            [
                'Content-Type' => 'application/json'
            ],
            json_encode([
                'success' => true,
                'message' => 'notices successfully stored'
            ])
        );

        (new HttpResponder())->respond($response);
    } catch (JsonException $excep) {
        $response = new HttpResponse(
            StatusCodeInterface::STATUS_BAD_REQUEST,
            [
                'Content-Type' => 'application/json'
            ],
            json_encode([
                'success' => false,
                'error' => 'could not parse json'
            ])
        );
        (new HttpResponder())->respond($response);
    }
}

