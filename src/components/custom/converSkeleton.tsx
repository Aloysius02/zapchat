

export default function MsgSkeleton() {
  return (
  <div className="px-8 py-4  w-full flex flex-col gap-4">
    <Part/>
    <Part/>
    <Part/>
    <Part/>
    <Part/>
    <Part/>
    <Part/>
    <Part/>
    <Part/>
    <Part/>
    <Part/>
    <Part/>
    <Part/>
  </div>
  );
}

function Part() {
  return (
    <div className="flex flex-col gap-6 w-full ">
      <div className="flex gap-4 items-center w-full">
        <div className="skeleton  w-16 h-16 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-1 w-full">
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-6 w-full"></div>
        </div>
      </div>
    </div>
  );
}



