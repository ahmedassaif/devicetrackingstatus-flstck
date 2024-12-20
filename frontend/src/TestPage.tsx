import { Button, Spinner } from "flowbite-react";


const TestPage: React.FC = () => {

    return(

      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <img src="/images/beams.jpg" alt="" className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
        <div className="relative px-6 pb-8 pt-10 shadow-xl sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="mx-auto max-w-md">
            <Button>
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </Button>
          </div>
        </div>
      </div>

    );
};

export default TestPage;