<?php

namespace App\State;

use ApiPlatform\Doctrine\Orm\State\CollectionProvider;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Erp\Core\ErpManager;
use App\Repository\CategoryRepository;
use App\Repository\UserRepository;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class CategoriesStateProvider implements ProviderInterface
{
    public function __construct(
        private readonly RequestStack $requestStack,
        #[Autowire(service: CollectionProvider::class)] private ProviderInterface $collectionProvider,
        private readonly UserRepository $userRepository,
        private readonly CategoryRepository $categoryRepository,

    )
    {
        $this->isOnlineMigvan = $_ENV['IS_ONLINE_MIGVAN'] === "true";
        $this->isUsedMigvan = $_ENV['IS_USED_MIGVAN'] === "true";
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        try {
            $response = $this->categoryRepository->GetAppCategories();
            return $response;
        } catch (\Throwable $exception) {
            $obj = new \stdClass();
            $obj->error = $exception->getMessage();
            return $obj;
        }
    }
}
