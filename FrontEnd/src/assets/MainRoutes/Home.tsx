import HomeTopMenu from "../Components/HomeComponents/HomeTopMenu";

function Home() {
    return (
        <>
            <div className="hidden xl:flex flex-col mt-22 h-full">
                <div className="mx-auto w-3/4">
                    <HomeTopMenu />
                </div>
                {/* Index card space 
                --fetch cards from home....
                --create index card area component..
                --feed the index cards area the list of cards... 
                --cycle through the cards.. keeping track of current index..
                --when the state changes.. send a post request by id -> questionBody .. and set stateful var to new status.. use returned body and update stateful list at question index.. 
                */}
            </div>
            <div className="block xl:hidden">Please Extend Browser Size</div>
        </>
    );
}

export default Home;
