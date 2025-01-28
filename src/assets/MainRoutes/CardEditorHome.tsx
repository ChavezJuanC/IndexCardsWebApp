import CardEditorTopMenu from "../Components/CardEditorHomeComponents/CardEditorTopMenu";

function CardEditorHome() {
    return (
        <>
            <div className="hidden xl:flex flex-col mt-22 h-full border-2 border-black">
                <div className="mx-auto w-3/4">
                    <CardEditorTopMenu />
                </div>
            </div>
            <div className="block xl:hidden">Please Extend Browser Size</div>
        </>
    );
}

export default CardEditorHome;
