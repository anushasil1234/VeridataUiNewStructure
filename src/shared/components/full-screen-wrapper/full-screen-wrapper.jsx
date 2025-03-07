import React, { useState } from 'react'
import FullScreenModel from 'shared/utils/modals/fullscreen-modal';

const FullScreenWrapper = (Component) => {
    const FullScreenWrapperAdded = () => {
        const [modelOpen, setModelOpenOpen] = useState(true);

        const closeFullscreenModel = () => {
            setModelOpenOpen(false);
        }

        return (
            <FullScreenModel
                open={modelOpen}
                content={<Component closeFullscreenModel={closeFullscreenModel} />}
            />
        )
    }
    return FullScreenWrapperAdded
}

export default FullScreenWrapper
