export default function MsgSkeleton() {
  return (
  <div className="px-4 py-6 flex flex-col gap-4">
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
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <div className="skeleton  w-10 h-10 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-1">
          <div className="skeleton h-4 w-40"></div>
          <div className="skeleton h-4 w-40"></div>
        </div>
      </div>
      
      <div className="flex gap-4 items-center justify-end">
        <div className="flex flex-col gap-1">
          <div className="skeleton h-8 w-40"></div>
     
        </div>
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
      </div>
    </div>
  );
}



