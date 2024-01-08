/*
 Common Annotations shared by all apps
*/

// using {sap.carbonvision as cv} from 'carbonvision';

// ////////////////////////////////////////////////////////////////////////////
// //
// //	CVQualityRecords Lists
// //
// annotate sf.CVQualityRecords with @(
//     Common.SemanticKey : [ID],
//     UI                 : {
//         Identification  : [
//             {Value : ID},
//             {
//                 $Type             : 'UI.DataFieldForAction',
//                 Action            : 'AdminService.inferenceImageCV',
//                 IconUrl           : 'sap-icon://detail-view',
//                 Inline            : true,
//                 Label             : 'Inference Image on ML Model',
//                 ![@UI.Emphasized] : true, //Button is highlighted
//             }
//         ],
//         SelectionFields : [
//             ID,
//             plant,
//             plantSection,
//             productId,
//             productName,
//             detectedAt,
//             qualityLabel,
//             defectedPerc
//         ],
//         LineItem        : [
//             {
//                 Value : ID,
//                 Label : '{i18n>ID}'
//             },
//             {
//                 Value : plant,
//                 Label : '{i18n>Plant}'
//             },
//             {
//                 Value : productId,
//                 Label : '{i18n>ProductID}'
//             },
//             {
//                 Value : productName,
//                 Label : '{i18n>ProductName}'
//             },
//             {
//                 Value : qualityLabel,
//                 Label : '{i18n>QualityLabel}'
//             },
//             {
//                 Value : confidence,
//                 Label : '{i18n>Confidence}'
//             },
//             //  Uncomment below parts if you want to have the inference button or more details at the list level
//             // {
//             //     $Type             : 'UI.DataFieldForAction',
//             //     Action            : 'AdminService.inferenceImageCV',
//             //     IconUrl           : 'sap-icon://detail-view',
//             //     Inline            : true,
//             //     ![@UI.Emphasized] : true, //Button is highlighted
//             // },
//             // {   
//             //     Value : image 
//             // },
//             {
//                 Value : detectedAt,
//                 Label : '{i18n>DetectedAt}'
//             },
//             // {
//             //     Value : detectedPerc,
//             //     Label : '{i18n>DetectedPerc}'
//             // }
//         ]
//     }
// ) {
//     ID @Common : {
//         SemanticObject  : 'CVQualityRecords',
//         Text            : ID,
//         TextArrangement : #TextOnly
//     };
// };

// ////////////////////////////////////////////////////////////////////////////
// //
// //	CVQualityRecords Details
// //
// annotate sf.CVQualityRecords with @(UI : {
//     HeaderInfo        : {
//         TypeName       : '{i18n>CVQualityRecord}',
//         TypeNamePlural : '{i18n>CVQualityRecords}',
//         Title          : {Value : productName},
//         Description    : {Value : productId},
//         // ImageUrl       : image
//     },
//     // HeaderFacets      : [{
//     //     $Type  : 'UI.ReferenceFacet',
//     //     Label  : '{i18n>Description}',
//     //     Target : '@UI.FieldGroup#Descr'
//     // }],
//     // FieldGroup #Descr : {Data : [{Value : productId}]},
// });


// ////////////////////////////////////////////////////////////////////////////
// //
// //	CVQualityRecords Elements
// //
// annotate sf.CVQualityRecords with {
//     ID           @title : '{i18n>ID}';
//     plant        @title : '{i18n>Plant}';
//     plantSection @title : '{i18n>PlantSection}';
//     productId    @title : '{i18n>ProductID}';
//     productName  @title : '{i18n>ProductName}';
//     numberOfProducts  @title : '{i18n>NumberOfProducts}';
//     qualityLabel @title : '{i18n>QualityLabel}';
//     confidence   @title : '{i18n>Confidence}';
//     defectedPerc @title : '{i18n>DefectedPerc}';
//     detectedAt   @title : '{i18n>DetectedAt}';
//     detectedDate   @title : '{i18n>DetectedDate}';
//     image        @(
//         Common.Label  : 'Image',
//         UI.IsImageURL : true
//     );
// }