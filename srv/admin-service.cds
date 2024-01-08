using {sap.carbonvision as ctr} from '../db/ctr-data-model';
//using {sap.carbonvision as ctr2} from '../db/ctr2-data-model';

//service AdminService @(requires:'admin') {
service AdminService @(path : '/analytics'){
  entity CVQualityRecords as projection on ctr.CVQualityRecords;

  entity DefectiveProductPrices  as projection on ctr.DefectiveProductPrices;
  
  entity UPSTREAM_GHG_INTENSITY_REDUCTION as projection on ctr.UPSTREAM_GHG_INTENSITY_REDUCTION;
  
  entity REDUCTION_OF_GHG_EMISSIONS_INCLUDING_METHANE_THROUGH_VENTING_REDUCTION_EFFORTS as projection on ctr.REDUCTION_OF_GHG_EMISSIONS_INCLUDING_METHANE_THROUGH_VENTING_REDUCTION_EFFORTS;
  
  entity ghg_emissions_by_region_OpCtrl as projection on ctr.ghg_emissions_by_region_OpCtrl;
  
  entity ghg_emissions_by_business_OpCtrl as projection on ctr.ghg_emissions_by_business_OpCtrl;
  
  entity ghg_emissions_reduction_by_business as projection on ctr.ghg_emissions_reduction_by_business;
  
  entity ghg_equity_share_business as projection on ctr.ghg_equity_share_business;
  
  entity GHG_Scope3_Cat11_OpCtrl_EquityShare as projection on ctr.GHG_Scope3_Cat11_OpCtrl_EquityShare;
}

