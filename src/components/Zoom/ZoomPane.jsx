import { useState } from 'react';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ZoomOutOutlinedIcon from '@mui/icons-material/ZoomOutOutlined';

const ZoomPane = ({onZoomChange}) => {
    const [zoomLevel, setZoomLevel] = useState(100);
    const prevZoomLevel = zoomLevel;
    const handleZoomIn = () => {
        setZoomLevel(prevZoomLevel => prevZoomLevel + 10);
        onZoomChange(ZoomLevel + 10);
      };
    
      const handleZoomOut = () => {
        setZoomLevel(prevZoomLevel => Math.max(10, prevZoomLevel - 10));
        onZoomChange(Math.max(10, prevZoomLevel - 10));
      };

    return (
        <div>
            <button className='btn btn-light border border-secondary border-end-0 rounded-end-0' onClick={handleZoomOut}><ZoomOutOutlinedIcon fontSize='large' color='action'/></button>
            <button className='btn btn-light border border-secondary text-secondary rounded-0'><h4>{zoomLevel}%</h4></button>
            <button className='btn btn-light border border-secondary border-start-0 rounded-start-0' onClick={handleZoomIn}><ZoomInOutlinedIcon fontSize='large' color='action'/></button>
        </div>
    );
};

export default ZoomPane;
