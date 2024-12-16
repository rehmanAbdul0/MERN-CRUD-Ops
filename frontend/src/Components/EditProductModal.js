// components/EditProductButton.jsx
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '../Components/UI/Dialog';
import { Input } from '../Components/UI/Input';
import { Label } from '../Components/UI/Label';
import { Button } from '../Components/UI/Button';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';

const EditProductButton = ({ productDetails, setProductDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({
    ...productDetails,
    tags: productDetails.tags || [],
    dimensions: productDetails.dimensions || { width: '', height: '', depth: '' },
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes for simple fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for nested objects (e.g., dimensions)
  const handleNestedInputChange = (e, field) => {
    const { value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [field]: value,
      },
    }));
  };

  // Handle adding a new tag
  const handleAddTag = () => {
    setEditForm((prev) => ({
      ...prev,
      tags: [...prev.tags, ''],
    }));
  };

  // Handle removing a tag
  const handleRemoveTag = (index) => {
    setEditForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // Handle tag input change
  const handleTagChange = (e, index) => {
    const { value } = e.target;
    setEditForm((prev) => {
      const newTags = [...prev.tags];
      newTags[index] = value;
      return { ...prev, tags: newTags };
    });
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/${productDetails.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProductDetails(updatedProduct);
        setShowModal(false);
        toast.success('Product updated successfully!');
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      console.error("Error updating product", error);
      toast.error('An error occurred while updating the product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button 
        onClick={() => setShowModal(true)} 
        className="flex items-center gap-2 w-full h-12 text-lg"
      >
        <Pencil size={25} />
        Edit Product
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={editForm.title}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={editForm.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={editForm.category}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Brand */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Input
                id="brand"
                name="brand"
                value={editForm.brand}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* SKU */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sku" className="text-right">
                SKU
              </Label>
              <Input
                id="sku"
                name="sku"
                value={editForm.sku}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Price */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price ($)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={editForm.price}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Discount Percentage */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discountPercentage" className="text-right">
                Discount (%)
              </Label>
              <Input
                id="discountPercentage"
                name="discountPercentage"
                type="number"
                step="0.01"
                value={editForm.discountPercentage}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Rating */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                step="0.01"
                min="0"
                max="5"
                value={editForm.rating}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Stock */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={editForm.stock}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Tags */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right">Tags</Label>
              <div className="col-span-3 space-y-2">
                {editForm.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={tag}
                      onChange={(e) => handleTagChange(e, index)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveTag(index)}
                      className="px-2 py-1 text-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={handleAddTag} className="mt-2">
                  Add Tag
                </Button>
              </div>
            </div>

            {/* Weight */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight (kg)
              </Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.01"
                value={editForm.weight}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Dimensions (cm)</Label>
              <div className="col-span-3 grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="width" className="block text-sm">
                    Width
                  </Label>
                  <Input
                    id="width"
                    name="width"
                    type="number"
                    step="0.01"
                    value={editForm.dimensions.width}
                    onChange={(e) => handleNestedInputChange(e, 'width')}
                  />
                </div>
                <div>
                  <Label htmlFor="height" className="block text-sm">
                    Height
                  </Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    step="0.01"
                    value={editForm.dimensions.height}
                    onChange={(e) => handleNestedInputChange(e, 'height')}
                  />
                </div>
                <div>
                  <Label htmlFor="depth" className="block text-sm">
                    Depth
                  </Label>
                  <Input
                    id="depth"
                    name="depth"
                    type="number"
                    step="0.01"
                    value={editForm.dimensions.depth}
                    onChange={(e) => handleNestedInputChange(e, 'depth')}
                  />
                </div>
              </div>
            </div>

            {/* Warranty Information */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="warrantyInformation" className="text-right">
                Warranty Info
              </Label>
              <Input
                id="warrantyInformation"
                name="warrantyInformation"
                value={editForm.warrantyInformation}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Shipping Information */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shippingInformation" className="text-right">
                Shipping Info
              </Label>
              <Input
                id="shippingInformation"
                name="shippingInformation"
                value={editForm.shippingInformation}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Availability Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="availabilityStatus" className="text-right">
                Availability
              </Label>
              <Input
                id="availabilityStatus"
                name="availabilityStatus"
                value={editForm.availabilityStatus}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Return Policy */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="returnPolicy" className="text-right">
                Return Policy
              </Label>
              <Input
                id="returnPolicy"
                name="returnPolicy"
                value={editForm.returnPolicy}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* Minimum Order Quantity */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minimumOrderQuantity" className="text-right">
                Minimum Order Qty
              </Label>
              <Input
                id="minimumOrderQuantity"
                name="minimumOrderQuantity"
                type="number"
                value={editForm.minimumOrderQuantity}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowModal(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              onClick={handleUpdate} 
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProductButton;