import supabase, {supabaseUrl} from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id){
  const { data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;

}

export async function createEditCabin(newCabin, id){
  console.log("newCabin",newCabin);
  const hasImagePath = newCabin.image.name?.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", ""); 
  // https://zbqxefvvgeadxzhisdvl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // https://zbqxefvvgeadxzhisdvl.supabase.co

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1 create/edit cabin
  let query = supabase.from("cabins")

  // A] Create
  if(!id)
    query = query
      .insert([{...newCabin, image: imagePath}])
      
  // B] Edit 
  if(id)
    query = query
      .update({ 
        ...newCabin,
        image: imagePath
       })
      .eq("id", id);


  const { data, error } = await query.select().single();
      
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }


  //upload image 
  if(hasImagePath) return data;

  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);


  //delete cabin data if image was not uploaded
  if(storageError){
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id)

      throw new Error("Cabins image could not be uploaded and the cabin was not created");
    }

  return data;

}