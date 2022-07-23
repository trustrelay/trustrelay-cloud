import { ResponsiveChoropleth } from "@nivo/geo"

import { worldCountries } from "../../api/models/world_countries"
import { GeoScore, SelectedCountryScore } from "../../api/models/models"
import { useState } from "react"
import React from "react"

const MyResponsiveChoropleth: any = ResponsiveChoropleth

interface GeoChartProps {
    maxValue: number;
    scores: Array<GeoScore>;
    projectionScale:number;
    onSelectionChange:(selectedCountry:SelectedCountryScore)=>void;
}

type GeoChartState = {
    selectedCountry: string;
}

class GeoChart extends React.Component<GeoChartProps, GeoChartState> {

 constructor(props:GeoChartProps){
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
 }

    componentDidMount() {
        // console.log(`[geo-chart] selected country: ${this.state.selectedCountry}`)
        
      }

    state: GeoChartState = {
        selectedCountry: ""
    }

    selectCountry = (country: string, value:number) => {
        this.setState((state) => ({
          selectedCountry: country,
        }));

        this.props.onSelectionChange({name:country, score:value} as SelectedCountryScore)
      };

       handleScroll = (event: React.UIEvent<HTMLElement>) => {
        console.log(event.currentTarget.scrollTop);
        console.log(event.currentTarget.offsetHeight);
      };

    render() {
        return (
            <div style={{width:"100%", height:"100%"}} onScroll={(evt)=>console.log(evt)}>
                <MyResponsiveChoropleth
            data={this.props.scores}
            features={worldCountries.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="nivo"
            domain={[0, this.props.maxValue]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".0s"
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            projectionScale={this.props.projectionScale}
            enableGraticule={true}
            graticuleLineColor="#dddddd"
            borderWidth={0.5}

            onClick={(e: any) => this.selectCountry(e.properties.name, e.value)}
            borderColor="#152538"
            tooltip={(node: any) => {
                if (node && node.feature.data.value) {
                    return (<div style={{ fontFamily: "raleway", backgroundColor: `${node.feature.color}`, fontSize: "14px" }}>{`${node.feature.properties.name}`}</div>)
                }
                return <></>
            }}
            legends={[
                {
                    anchor: 'bottom-left',
                    direction: 'column',
                    justify: true,
                    translateX: 10,
                    translateY: -100,
                    itemsSpacing: 0,
                    itemWidth: 94,
                    itemHeight: 18,
                    itemDirection: 'left-to-right',
                    itemTextColor: '#666666',
                    itemOpacity: 0.85,
                    symbolSize: 18,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000000',
                                itemOpacity: 1,
                                cursor: "pointer"
                            }
                        }
                    ]
                }
            ]}
        />
            </div>
        )
    }


}

export default GeoChart;