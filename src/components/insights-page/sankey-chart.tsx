import { ResponsiveSankey } from '@nivo/sankey';

const SankeyChart = (
    {
        data
    }:{data:any}) => {
    return (
        <ResponsiveSankey
        data={data}
        margin={{ top: 20, right: 5, bottom: 80, left: 5 }}
        align="justify"
        colors={{ scheme: 'nivo' }}
        nodeOpacity={1}
        nodeHoverOthersOpacity={0.35}
        nodeThickness={18}
        nodeSpacing={24}
        nodeBorderWidth={0}
        nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
        nodeBorderRadius={3}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        linkContract={3}
        enableLinkGradient={true}
        labelPosition="inside"
        labelOrientation="horizontal"
        enableLabels={true}
        labelPadding={16}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
        linkTooltip={(node:any)=> { 
             return (<strong>{`${node.link.source.id} -> ${node.link.target.id}`}</strong>
         )}}
         nodeTooltip={(node:any)=> {
          return <></> 
        }
        }
    />
    )
}

export default SankeyChart;