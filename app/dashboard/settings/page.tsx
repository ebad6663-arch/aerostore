import {
  getStoreSettings,
  updateStoreSettings,
} from "@/lib/actions/settings";

import {
  getCategories,
  createCategory,
  deleteCategory,
} from "@/lib/actions/category";


export default async function SettingsPage() {


  const settings = await getStoreSettings();

  const categories = await getCategories();



  async function addCategory(formData: FormData) {
    "use server";

    await createCategory(formData);
  }



  async function removeCategory(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;

    await deleteCategory(id);
  }



  return (

    <main className="
    min-h-screen
    bg-black
    p-6
    text-white
    ">


      <div className="
      mx-auto
      max-w-5xl
      space-y-10
      ">



        <form

        action={updateStoreSettings}

        className="
        space-y-10
        rounded-3xl
        border
        border-white/10
        bg-[#111]
        p-8
        "

        >


          <input
          type="hidden"
          name="id"
          value={settings.id}
          />


          <h1 className="
          text-4xl
          font-black
          ">
          Store Settings
          </h1>



          <input

          name="storeName"

          defaultValue={settings.storeName}

          className="
          h-12
          w-full
          rounded-xl
          border
          border-white/10
          bg-black
          px-4
          "

          />



          <textarea

          name="storeDescription"

          defaultValue={settings.storeDescription ?? ""}

          className="
          min-h-32
          w-full
          rounded-xl
          border
          border-white/10
          bg-black
          p-4
          "

          />



          <input

          name="supportEmail"

          defaultValue={settings.supportEmail ?? ""}

          className="
          h-12
          w-full
          rounded-xl
          border
          border-white/10
          bg-black
          px-4
          "

          />



          <input

          name="phone"

          defaultValue={settings.phone ?? ""}

          className="
          h-12
          w-full
          rounded-xl
          border
          border-white/10
          bg-black
          px-4
          "

          />



          <button

          className="
          rounded-xl
          bg-orange-500
          px-8
          py-3
          font-bold
          text-black
          "

          >

          Save Settings

          </button>



        </form>




        <div className="
        space-y-6
        rounded-3xl
        border
        border-white/10
        bg-[#111]
        p-8
        ">



          <h2 className="
          text-3xl
          font-black
          ">
          Categories
          </h2>




          <form

          action={addCategory}

          className="space-y-4"

          >


          <input
          name="name"
          required
          placeholder="Category name"
          className="
          h-12
          w-full
          rounded-xl
          border
          border-white/10
          bg-black
          px-4
          "
          />


          <input

          name="description"

          placeholder="Category description"

          className="
          h-12
          w-full
          rounded-xl
          border
          border-white/10
          bg-black
          px-4
          "

          />


          <button

          className="
          rounded-xl
          bg-orange-500
          px-6
          py-3
          font-bold
          text-black
          "

          >

          Add Category

          </button>


          </form>





          <div className="space-y-3">


          {
          categories.map((category)=>(


          <div

          key={category.id}

          className="
          flex
          items-center
          justify-between
          rounded-xl
          border
          border-white/10
          p-4
          "

          >


          <div>

          <p className="font-bold">
          {category.name}
          </p>


          <p className="text-sm text-neutral-400">
          {category._count.products} Products
          </p>

          </div>




          <form action={removeCategory}>


          <input

          type="hidden"

          name="id"

          value={category.id}

          />


          <button

          className="
          text-red-400
          "

          >

          Delete

          </button>


          </form>



          </div>


          ))
          }


          </div>



        </div>



      </div>


    </main>

  );

}