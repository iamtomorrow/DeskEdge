
import './style.css';

export const GraphColumn = ( { height, value } ) => {
    return (
        <div className={`graph-column`} style={{ height: height }}>
            <p className='graph-column-value b.outputs > a.outputs'></p>
        </div>
    )
}
