import { useContext, useEffect, useState } from "react";
import { AppContext, contextType } from "../../../App";
import './Information.css'

export const Information = ({ itemName }: { itemName: string }) => {
    const context = useContext<contextType>(AppContext);
    const [itemDetails, setItemDetails] = useState<any>(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch('https://api.tarkov.dev/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                        {
                          items(names: "${itemName}") {
                            id
                            buyFor {
                              price
                              source
                              currency
                            }
                            sellFor {
                              currency
                              price
                              vendor {
                                name
                              }
                            }
                            image512pxLink
                          }
                        }
                        `
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setItemDetails(data.data.items[0]);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchItemDetails();
    }, [itemName]);

    return (
        <div key={itemName} id={itemName} className={"Information"}>
            <h2>{itemName}</h2>
            {itemDetails && (
                <div>
                    <p>ID: {itemDetails.id}</p>
                    <h3>Buy For:</h3>
                    <ul>
                        {itemDetails.buyFor.map((buy: any, index: number) => (
                            <li key={index}>
                                {buy.price} {buy.currency} from {buy.source}
                            </li>
                        ))}
                    </ul>
                    <h3>Sell For:</h3>
                    <ul>
                        {itemDetails.sellFor.map((sell: any, index: number) => (
                            <li key={index}>
                                {sell.price} {sell.currency} to {sell.vendor.name}
                            </li>
                        ))}
                    </ul>
                    <h3>Image:</h3>
                    <img src={itemDetails.image512pxLink} alt={`${itemName} image`} />
                </div>
            )}
        </div>
    );
};