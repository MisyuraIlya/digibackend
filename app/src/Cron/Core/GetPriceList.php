<?php

namespace App\Cron\Core;

use App\Entity\PriceList;
use App\Erp\Core\ErpManager;
use App\Repository\PriceListRepository;

class GetPriceList
{
    public function __construct(
        private readonly ErpManager $erpManager,
        private readonly PriceListRepository $priceListRepository,
    )
    {
    }

    public function sync()
    {
//        $response = $this->erpManager->GetPriceList();
//        foreach ($response->priceLists as $itemRec){
//            $priceList = $this->priceListRepository->findOneByExtId($itemRec->priceListExtId);
//            if(!$priceList){
//                $priceList = new PriceList();
//                $priceList->setExtId($itemRec->priceListExtId);
//            }
//            $priceList->setTitle($itemRec->priceListTitle);
//            $this->priceListRepository->createPriceList($priceList,true);
//        }
    }
}