<?php declare(strict_types=1);

namespace uncutz\NoticeApp;

final class Request
{
    /**
     * @return array<string, string>
     */
    public function getQueryParams(): array
    {
        return $_GET;
    }

    /**
     * @return array<string, string>
     */
    public function getPostParams(): array
    {
        return $_POST;
    }
}