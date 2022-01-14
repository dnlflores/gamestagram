

const SelectImagePage = (props) => {

    return (
        <div
            className="modal-header"
            // onClick={e => {
            //     props.setTrigger(false);
            // }}
        >
            <p>
                welcome.
            </p>
            {props.trigger && (
                <div className="modal-outer">
                    
                    <div className="modal-inner">
                        <p>you win!</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SelectImagePage;