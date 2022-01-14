

const SelectImagePage = (props) => {

    return (
        <div
            className="modal-header"
        // onClick={e => {
        //     props.setTrigger(false);
        // }}
        >
            {props.trigger && (
                <div className="modal-grid">
                    <div className="modal-outer">
                        <div className="modal-inner">
                            <p>you win!</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SelectImagePage;