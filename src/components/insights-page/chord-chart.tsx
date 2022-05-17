import { ResponsiveChord } from '@nivo/chord';

const ChordChart = ({
data,
keys
}:{
data:any,
keys:Array<string>;
}) => {
    return (
        <ResponsiveChord
        data={data}
        keys={keys}
        margin={{ top: 60, right: 0, bottom: 90, left: 0 }}
        valueFormat=".2f"
        padAngle={0.02}
        innerRadiusRatio={0.96}
        innerRadiusOffset={0.05}
        arcOpacity={1}
        arcBorderWidth={1}
        arcBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
        ribbonOpacity={0.8}
        ribbonBorderWidth={1} 
        enableLabel={true}
        label="id"
        labelOffset={12}
        labelRotation={-90}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 0.1 ] ] }}
        colors={{ scheme: 'nivo' }}
        ribbonTooltip={(node:any)=> {
          if(node){
            return (<strong>{`${node.ribbon.source.id}(${node.ribbon.source.value}) <-> ${node.ribbon.target.id}(${node.ribbon.target.value})`}</strong> )
        }
        return <></>
    }}
       
         
        arcTooltip={(node:any)=> {
        //     if(node){
        //     return (  <strong>{`${node.arc.value}`}</strong>  )
        // }
        return <></>
        }}
        isInteractive={true}    
        animate={true}  
        layers={['ribbons', 'arcs', 'labels', 'legends']}
        // legends={[
        //     {
        //         anchor: 'bottom-right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 0,
        //         translateY: 0,
        //         itemWidth: 200,
        //         itemHeight: 14,
        //         itemsSpacing: 0,
        //        itemTextColor: 'inherit',
        //         itemDirection: 'left-to-right',
        //         symbolSize: 12,
        //         symbolShape: 'circle',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: { 
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />
    )
}

export default ChordChart;