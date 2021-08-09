<?php declare(strict_types=1);

use uncutz\NoticeApp\Request;
use uncutz\NoticeApp\Response;

require_once __DIR__ . '/../../vendor/autoload.php';

$request = new Request();



// ...

$response = new Response(
    200,
    [],
    'Hello, World'
);

print_r($response);