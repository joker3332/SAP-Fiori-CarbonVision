namespace sap.carbonvision;

using {
  managed,
  Currency,
  sap
} from '@sap/cds/common';

///////////////////////////////////////////////////////////////////////
//// Data Model for Auto. Defeat Detection module                  ////
//// CVQualityRecords - Auto Quality Records via Computer Vision   ////
//// DefectiveProductPrices - Pricing Rules for Defective Products ////
///////////////////////////////////////////////////////////////////////

entity CVQualityRecords : managed {
  key ID               : Integer;
      detectedAt       : Timestamp @cds.on.update : $now;
      detectedDate     : Date;
      plant            : String(4);
      plantSection     : String(3) default 'YOH';
      productId        : String(18) default 'SG23';
      productName      : String(100) default 'LGP';
      image            : String;
      segmentedImage   : LargeString;
      defectedPerc     : Decimal(9, 2) default 0.00;
      //defectiveDiscount and defectiveDesc taken from DefectiveProductPrices based defeatedPerc
      defectiveDiscount : Decimal(9, 2); 
      defectiveDesc    : String(40);

      successInference : Boolean default false;
      // image        : LargeBinary @Core.MediaType : 'image/png';
      confidence       : Decimal(9, 3);
      qualityLabel     : QualityLabel;
      numberOfProducts : Integer default 1;
}

type QualityLabel : String enum {
  OK    = 'Y';
  NotOk = 'N';
}

entity DefectiveProductPrices : managed {
  key productId   : String(18);
      productName : String(100);
      basePrice   : Decimal(9, 2);
      currency    : Currency;

      Items       : Composition of many {
                      key item              : String(2);
                          desc              : localized String(40);
                          fromDefectedPerc  : Decimal(9, 2); //inclusive: <=
                          toDefectedPerc    : Decimal(9, 2); //exclusive <
                          defectiveDiscount : Decimal(9, 2);
                          validFrom         : Date; //inclusive: <=
                          validTo           : Date default '9999-12-31'; //exclusive <
                    };
}

////////////////////////////////////////////////////////////
//Data Model for CarbonVision module
////////////////////////////////////////////////////////////

//Year,Upstream Malaysia (tCO2e/kboe),Upstream International (tCO2e/kboe),Total Upstream (tCO2e/kboe)
entity UPSTREAM_GHG_INTENSITY_REDUCTION : managed {
  key year: Integer;
      upstream_mas: Decimal(9,2);
      upstream_inter: Decimal(9,2);
      total_upstream: Decimal(9,2);
}

//Year,Reduction Efforts Including Methane (Million tCO2e)
entity REDUCTION_OF_GHG_EMISSIONS_INCLUDING_METHANE_THROUGH_VENTING_REDUCTION_EFFORTS: managed {
  key year: Integer;
      reduction_effort_including_methane: Decimal(9,2);
}

//Year,Malaysia Operation (Million tCO2e),International Operation (Million tCO2e)
entity ghg_emissions_by_region_OpCtrl : managed {
  key year: Integer;
      operation_mas: Decimal(9,2); 
      operation_inter: Decimal(9,2);
}

//Year,Upstream,Downstream,Gas,Corporate_and_Others
entity ghg_emissions_by_business_OpCtrl : managed {
  key year: Integer;
      upstream: Decimal(9,2); 
      downstream: Decimal(9,2);
      gas: Decimal(9,2);
      corporate_others: Decimal(9,2);
}

//Year,Annual GHG Emissions Reduction (Million tCO2e),Cumulative GHG Emissions Reduction (Million tCO2e)
entity ghg_emissions_reduction_by_business : managed {
  key year: Integer;
      annual_ghg_emissions_reduction : Decimal(9,2);
      cumulative_ghg_emissions_reduction : Decimal(9,2);

}

//Year,Upstream (Million tCO2e),Gas (Million tCO2e),Downstream (Million tCO2e),Corporate and Others (Million tCO2e)
entity ghg_equity_share_business : managed {
  key year                : Integer;
      upstream            : Decimal(9,2) default 0.00; 
      gas                 : Decimal(9,2) default 0.00;
      downstream          : Decimal(9,2) default 0.00;
      corporate_and_others: Decimal(9,2) default 0.00;
}

//Year,Operational Control (Million tCO2e),Equity Share (Million tCO2e)
entity GHG_Scope3_Cat11_OpCtrl_EquityShare : managed {
  key year                : Integer;
      operationalControl : Decimal(9,2); 
      equityShare         : Decimal(9,2); 
}


