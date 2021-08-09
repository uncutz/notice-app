<?php declare(strict_types=1);

namespace uncutz\NoticeApp;

final class Response
{
    /** @var int */
    private $statusCode;

    /** @var string[] */
    private $header;

    /** @var string */
    private $body;

    /**
     * @param int $statusCode
     * @param string[] $header
     * @param string $body
     */
    public function __construct(int $statusCode, array $header, string $body)
    {
        $this->statusCode = $statusCode;
        $this->header = $header;
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
     * @return string[]
     */
    public function getHeader(): array
    {
        return $this->header;
    }

    /**
     * @return string
     */
    public function getBody(): string
    {
        return $this->body;
    }
}