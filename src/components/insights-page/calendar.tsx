import { ResponsiveCalendar } from '@nivo/calendar';

const CalendarChart = ({ data }: { data: any }) => {

    var today = new Date()
    var thisYear = today.getFullYear()
    var firstDayOfYear = `${thisYear}-01-01`
    var lastDayOfYear = `${thisYear}-12-31`

    return (
        <ResponsiveCalendar
            align="left"
            data={data}
            from={firstDayOfYear}
            to={lastDayOfYear}
            emptyColor="transparent"
            colors={['#b2ebf2','#0090bf', '#5ac0f2' ]}
            // colors={['#ff0000','#00ff00', '#0000ff' ]}
            margin={{ top: 20, right: 10, bottom: 0, left: 10 }}
            // yearSpacing={40}
            monthBorderColor="#666666"
            dayBorderWidth={1}
            tooltip={(node:any)=> {
                if(node){
                    return (<strong>{`${node.day}: queried ${node.value} times`}</strong>)
                }
               return <></>
                }}
            dayBorderColor="#aaaaaa"
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    itemTextColor: "#ff0000",
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left'
                }
            ]}
        />
    )
}

export default CalendarChart;