namespace sap.carbonvision;
using {sap.carbonvision as ctr} from './ctr-data-model';

////////////////////////////////////////////////////////////
//Analytics Model for Smart Quality Inspection module
//AnomaliesExtendedView:  The extended view of Anomalies.
////////////////////////////////////////////////////////////

//Views
 @Aggregation.ApplySupported.PropertyRestrictions : true
entity CVQualityRecordsView as projection on ctr.CVQualityRecords {
    *
  } excluding {
    image,
    createdBy,
    modifiedBy
  };

annotate CVQualityRecordsView with {
    @Analytics.Dimension : true
    ID;
    @Analytics.Dimension : true
    detectedAt;
    @Analytics.Dimension : true
    detectedDate;
    @Analytics.Dimension : true
    plant;
    @Analytics.Dimension : true
    plantSection;
    @Analytics.Dimension : true
    productId;
    @Analytics.Dimension : true
    productName;    
    @Analytics.Dimension : true
    qualityLabel;

    @Analytics.Measure   : true
    @Aggregation.default : #SUM
    numberOfProducts;

    @Analytics.Measure   : true
    @Aggregation.default : #AVG
    confidence;
  };

//Value Helpers
view QualityLabelView as select distinct qualityLabel from CVQualityRecordsView;

@readonly
@cds.odata.valuelist
entity QualityLabelVH {
  key qualityLabel : CVQualityRecordsView : qualityLabel;
};

view ProductIdView as select distinct productId from CVQualityRecordsView;

@readonly
@cds.odata.valuelist
entity ProductIdVH {
  key productId : CVQualityRecordsView : productId;
};