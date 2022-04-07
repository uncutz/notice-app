<?php declare(strict_types=1);

namespace uncutz\NoticeApp;


use Fig\Http\Message\RequestMethodInterface;

final class HttpRequest
{
    public function getMethod(): string
    {
        return strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET'); //wenn die Request Methode nicht festgelegt ist, dann ist sie GET
    }

    /**
     * @return array<string, string>
     */
    public function getQueryParams(): array
    {
        return $_GET ?? []; // wenn es einen Wert in der globalen supervar $_GET gibt, dann trage den wert in die liste, sonst nimm leeres Array
    }

    /**
     * @return array<string, string>
     */
    public function getPostParams(): array
    {
        return $_POST ?? [];
    }

    /**
     * @return string
     */
    public function getBody(): string
    {
        return (string)file_get_contents('php://input');
    }
}