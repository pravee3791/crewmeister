
/**
 * 
 * This is a error component : To test the component stop te services and reload the application
 * @returns A global error component for the Application 
 * 
 */
export default function ErroComponent() {
    let errorMessage = 'Error Trace Track';
    return (
        <>
            <div className="home">
                <div className="home-table">
                    <div className="error-message">
                        Something Went Wrong!!
                        Look Below for trace:
                    </div>
                    <div>
                        <p>{
                           `Message: ${errorMessage}`}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}