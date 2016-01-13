---
layout: post
title: How to OOP in Lua
---

I've found Lua to be a pretty fantastic language for building game prototypes. It has the cleanness and readability of JavaScript, but is one of the fastest scripting languages out there. Unfortunately, that similarity to JavaScript includes avoiding using OOP keywords, like "class" and "inherits". Ununfoturnately, these features can be fully recreated in Lua.

If you want to use classes in Lua, you can't hide behind object oriented abstractions. You need to understand how classes work and implement the behavior you want yourself. Take a look at my preferred way to create classes in Lua by looking at this example file:

<code>

    -- Declare an empty class to fill with methods
    local ClassExample = {}

    -- Create the constructor method
    function ClassExample:new(parameter)

      -- Class Setup
      local obj = {}
      setmetatable(obj, self)
      self.__index = self

      obj.property = paramter
      obj.alive = true

      return obj
    end

    -- Create any other methods you want
    function ClassExample:doAThing()
      print("do a thing")
    end

    -- return the class
    return ClassExample

</code>

So what's going on? Well, this file is basically just attaching the "new" and "doAThing" methods to an object called "ClassExample" before returning it. The "new" function is really where all the magic happens. This little guy is our constructor. It creates a new object and eventually returns it after doing some initial setup on its properties.

But how does the object know to use the class's methods, like "doAThing"? That's all taken care of by those two lines of code after the object is created, <code>setmetatable(obj, self)</code> and <code>self.__index = self</code>.

<code>setmetatable(obj, self)</code> tells the object instance where to look in case of a failed method look up. When "doAThing" is called on the object, it won't be able find it on the object directly, so it will check check the class instead. The second line, <code>self.__index = self</code>, just tells the class that it will represent itself when objects look it up.

We can now use this class in other files by writing:

<code>

    ClassExample = require('pathToClassExample')
    classInstance = ClassExample:new()
</code>


Not so bad, although a little less readable than in some other languages. What about inheritance? Well, It's basically the same, save a couple new lines of code.

<code>

    local SubclassExample = {}
    setmetatable(SubclassExample, Item)

    function SubclassExample:new(coord, damage, timer)

      -- Class setup
      local obj = Item:new(coord)
      setmetatable(obj, self)
      self.__index = self

      self.image = love.graphics.newImage('assets/units/grenade.png')

      obj.damage = damage
      obj.timer = timer or 2 -- # number of turns till explosion

      return obj
    end

    function SubclassExample:doAThing()
      print("do somthing else")
    end

    function SubclassExample:doAnotherThing()
      print("do another thing")
    end

    return SubclassExample

</code>

Setting up a subclass looks pretty similar to just setting up a class! You might have noticed on the second line <code>setmetatable(SubclassExample, Item)</code>. Just like before, this is setting a failed method lookup. Now when you look up a method on an instance of this subclass, it will fail to find it directly on the object, first look for it on it's class, then look for it on it's superclass. This means if you want to overwrite a methods, you just have to declare it again in this subclass file. The object will find this method first instead of it's superclass's method.

What about adding to a superclass's method, but not overwriting it entirely. Take a look at the first line inside the constructor. We call the superclass's constructor ourselves here. This way we still run all the code from the overwritten method, but can add to it ourselves.

Still confused? Checkout the documentation yourself [here](http://www.lua.org/pil/16.1.html).

