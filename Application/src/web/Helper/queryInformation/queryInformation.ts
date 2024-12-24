import { useContext } from "react";
import { AppContext, ItemData, ItemHideoutData, TaskItemData } from "../../App";

export async function fetchItemDetails(itemName: string): Promise<ItemData | undefined> {
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
        return data.data.items[0];
    } catch (error) {
        console.error('Error fetching item details:', error);
    }
}
export async function fetchHideoutItem(itemName: string): Promise<void | ItemHideoutData[]> {
    try {
        const response = await fetch(`http://localhost:8080/search_hideouts?item_name=${encodeURIComponent(itemName)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching hideout item:', error);
    }
}


