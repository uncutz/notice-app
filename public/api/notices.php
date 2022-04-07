<?php declare(strict_types=1);

use Fig\Http\Message\RequestMethodInterface;
use Fig\Http\Message\StatusCodeInterface;
use uncutz\NoticeApp\HttpRequest;
use uncutz\NoticeApp\HttpResponder;
use uncutz\NoticeApp\HttpResponse;

require_once __DIR__ . '/../../vendor/autoload.php';

$request = new HttpRequest();


if ($request->getMethod() === RequestMethodInterface::METHOD_GET) {
    $file = __DIR__ . '/../../data/notices.json';

    if (!file_exists($file) || !is_readable($file)) {
        $response = new HttpResponse(
            StatusCodeInterface::STATUS_INTERNAL_SERVER_ERROR,
            [
                'Content-Type' => 'application/json'
            ],
            json_encode([
                'success' => false,
                'error' => 'notices could not be read'
            ])
        );

        (new HttpResponder())->respond($response);
    }

    $body = file_get_contents(__DIR__ . '/../../data/notices.json');

    $response = new HttpResponse(
        StatusCodeInterface::STATUS_OK,
        [
            'Content-Type' => 'application/json'
        ],
        $body
    );

    (new HttpResponder())->respond($response);
}

if ($request->getMethod() === RequestMethodInterface::METHOD_POST) {
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

