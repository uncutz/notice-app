<?php declare(strict_types=1);

namespace uncutz\NoticeApp;

final class HttpResponse
{
    /** @var int */
    private $statusCode;

    /** @var array<string, string> */
    private $headers;

    /** @var string */
    private $body;

    /**
     * @param int $statusCode
     * @param array<string, string> $headers
     * @param string $body
     */
    public function __construct(int $statusCode, array $headers, string $body)
    {
        $this->statusCode = $statusCode;
        $this->headers = $headers;
        $this->body = $body;
    }

    /**
     * @return int
     */
    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    /**
     * @return array<string, string>
     */
    public function getHeaders(): array
    {
        return $this->headers;
    }

    /**
     * @return string
     */
    public function getBody(): string
    {
        return $this->body;
    }
}