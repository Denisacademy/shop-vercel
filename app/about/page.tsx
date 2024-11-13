import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

async function AboutPage() {
  // const { toast } = useToast();
  const user = await currentUser();
  console.log("userIdAuth", user?.emailAddresses[0].emailAddress);
  return (
    <section>
      <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl">
        We love
        <span className="bg-primary py-2 px-4 rounded-lg tracking-widest text-white">store</span>
      </h1>
      <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero hic distinctio ducimus temporibus nobis autem
        laboriosam repellat, magni fugiat minima excepturi neque, tenetur possimus nihil atque! Culpa nulla labore nam?
      </p>
      {/* <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }}
      >
        Show Toast
      </Button> */}
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </section>
  );
}
export default AboutPage;
