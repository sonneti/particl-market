import * as crypto from 'crypto-js';
import { HashableObjectType } from '../../api/enums/HashableObjectType';


export class ObjectHash {
    public static getHash(obj: any, type?: HashableObjectType): string {
        let revisedObj;
        switch (type) {
            case 'listingItemMessage': {
                const itemInformation = obj.ItemInformation;
                const paymentInformation = obj.PaymentInformation;

                const newObject = {
                    ItemInformation: {
                        title: itemInformation.title,
                        short_description: itemInformation.shortDescription,
                        long_description: itemInformation.longDescription,
                        location: {
                            country: itemInformation.ItemLocation.region,
                            address: itemInformation.ItemLocation.address,
                            gps: {
                                marker_title: itemInformation.ItemLocation.LocationMarker.markerTitle,
                                marker_text: itemInformation.ItemLocation.LocationMarker.markerText,
                                lng: itemInformation.ItemLocation.LocationMarker.lng,
                                lat: itemInformation.ItemLocation.LocationMarker.lat
                            }
                        }
                    },
                    PaymentInformation: {
                        type: paymentInformation.type,
                        escrow: {
                            type: paymentInformation.escrow.type,
                            ratio: {
                                buyer: paymentInformation.escrow.Ratio.buyer,
                                seller: paymentInformation.escrow.Ratio.seller
                            }
                        }
                    }
                };
                revisedObj = obj;
                break;
            }
            default: {
                revisedObj = obj;
            }
        }
        return crypto.SHA256(JSON.stringify(revisedObj).split('').sort().toString()).toString();
    }
}
