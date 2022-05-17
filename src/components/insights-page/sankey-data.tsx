export const sankeyData = {
    "nodes": [
        {
            "id": "Org1", 
        }, 
        {
            "id": "Org2", 
        }, 
        {
            "id": "Org3", 
        }, 
        {
            "id": "Source1", 
        }, 
        {
            "id": "Source2", 
        },
        {
            "id": "Source3", 
        },
        {
            "id": "Source4", 
        },
        {
            "id": "Common1", 
        },
        {
            "id": "Common2", 
        },
        {
            "id": "Common3", 
        },
        {
            "id": "Common4",  
        },
     
    ],
    "links": [
        {
            "source": "Org1",
            "target": "Source1",
            "value": 1
        },
        {
            "source": "Org1",
            "target": "Source2",
            "value": 1
        },
        {
            "source": "Org2",
            "target": "Source3",
            "value": 1
        },
        {
            "source": "Org3",
            "target": "Source4",
            "value": 1
        },
        {
            "source": "Source1",
            "target": "Common1",
            "value": 1
        },
        {
            "source": "Source2",
            "target": "Common1",
            "value": 1
        },  
        {
            "source": "Source3",
            "target": "Common3",
            "value": 1
        },
        {
            "source": "Source4",
            "target": "Common4",
            "value": 1
        }
    ]
}