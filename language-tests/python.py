##
# Keyword: import
##
import keyword

##
# Keyword: global
##
global foo

##
# Keyword: def
##
def improper_return_function(a):
    if (a % 2) == 0:
        return True

##
# Keyword: class
##
class ExampleClass:
    def function1(parameters):
        …
    def function2(parameters):
        …

##
# Keyword: nonlocal
##
nonlocal foo
def outer_function():
    a = 5
    def inner_function():
        nonlocal a
        a = 10
        print("Inner function: ",a)
    inner_function()
    print("Outer function: ",a)
